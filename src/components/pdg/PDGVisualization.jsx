import React, { useEffect, useRef, useState, useCallback } from "react";

const PDGVisualization = ({ pdgData }) => {
  const svgRef = useRef(null);
  const [processedData, setProcessedData] = useState(null);

  // Định nghĩa các helper functions với useCallback
  const createDefaultPDGLayout = useCallback(() => {
    // Tạo layout PDG mặc định khi không parse được dữ liệu
    return {
      nodes: [
        { id: "main", label: "main()", x: 300, y: 50, isVulnerable: false },
        { id: "buffer", label: "buffer", x: 150, y: 150, isVulnerable: false },
        { id: "input", label: "input", x: 300, y: 150, isVulnerable: false },
        { id: "strcpy", label: "strcpy", x: 450, y: 150, isVulnerable: true },
        { id: "printf", label: "printf", x: 300, y: 250, isVulnerable: false },
        { id: "return", label: "return", x: 300, y: 350, isVulnerable: false },
      ],
      edges: [
        { source: "main", target: "buffer" },
        { source: "main", target: "input" },
        { source: "main", target: "strcpy" },
        { source: "buffer", target: "strcpy" },
        { source: "input", target: "strcpy" },
        { source: "strcpy", target: "printf" },
        { source: "input", target: "printf" },
        { source: "printf", target: "return" },
      ],
    };
  }, []);

  const transformPDGFormat = useCallback((pdgData) => {
    // Chuyển đổi từ định dạng của backend sang định dạng component cần
    const nodes = [];
    const edges = [];

    // Xử lý nodes
    if (pdgData.nodes) {
      Object.entries(pdgData.nodes).forEach(([nodeId, nodeData], index) => {
        // Nếu không có tọa độ, tạo layout tròn
        const angle = (2 * Math.PI * index) / Object.keys(pdgData.nodes).length;
        const radius = 150;
        const centerX = 300;
        const centerY = 200;

        nodes.push({
          id: nodeId,
          label: nodeData.label || nodeId,
          x: nodeData.x || centerX + radius * Math.cos(angle),
          y: nodeData.y || centerY + radius * Math.sin(angle),
          isVulnerable: nodeData.isVulnerable || false,
        });
      });
    }

    // Xử lý edges
    if (pdgData.edges) {
      pdgData.edges.forEach((edge) => {
        edges.push({
          source: edge.source || edge.from,
          target: edge.target || edge.to,
        });
      });
    }

    return { nodes, edges };
  }, []);

  const parseDOTFormat = useCallback(
    (dotString) => {
      // Hàm đơn giản để parse DOT format - trong thực tế nên dùng thư viện chuyên dụng
      try {
        // Phân tích cơ bản từ DOT string
        const nodes = [];
        const edges = [];

        // Parse nodes
        const nodeMatches = dotString.match(/\s*(\w+)\s*\[([^\]]+)\]/g) || [];
        nodeMatches.forEach((nodeMatch, index) => {
          const idMatch = nodeMatch.match(/\s*(\w+)\s*\[/);
          const id = idMatch ? idMatch[1] : `node${index}`;

          // Parse label
          const labelMatch = nodeMatch.match(/label="([^"]+)"/);
          const label = labelMatch ? labelMatch[1] : id;

          // Check if node is vulnerable (based on attributes)
          const isVulnerable =
            nodeMatch.includes('color="red"') ||
            nodeMatch.includes('fillcolor="#fee2e2"');

          // Assign x,y coordinates in a circular layout
          const angle = (2 * Math.PI * index) / nodeMatches.length;
          const radius = 150;
          const centerX = 300;
          const centerY = 200;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          nodes.push({ id, label, x, y, isVulnerable });
        });

        // Parse edges
        const edgeMatches = dotString.match(/\s*(\w+)\s*->\s*(\w+)/g) || [];
        edgeMatches.forEach((edgeMatch) => {
          const parts = edgeMatch.match(/\s*(\w+)\s*->\s*(\w+)/);
          if (parts && parts.length >= 3) {
            edges.push({ source: parts[1], target: parts[2] });
          }
        });

        return { nodes, edges };
      } catch (error) {
        console.error("Error parsing DOT format:", error);
        return createDefaultPDGLayout();
      }
    },
    [createDefaultPDGLayout]
  );

  const parsePDGData = useCallback(
    (data) => {
      // Hàm chuyển đổi từ dữ liệu backend sang dữ liệu component cần
      try {
        // Nếu pdgData có định dạng đúng như mong đợi
        if (data && data.pdg_data) {
          // Nếu dữ liệu là JSON string
          let pdgObject;
          if (typeof data.pdg_data === "string") {
            try {
              pdgObject = JSON.parse(data.pdg_data);
            } catch (e) {
              console.error("Failed to parse PDG JSON:", e);
              return createDefaultPDGLayout();
            }
          } else if (typeof data.pdg_data === "object") {
            pdgObject = data.pdg_data;
          }

          if (pdgObject) {
            return transformPDGFormat(pdgObject);
          }
        }

        // Nếu có cấu trúc DOT
        if (
          data &&
          typeof data.pdg_data === "string" &&
          data.pdg_data.includes("digraph")
        ) {
          return parseDOTFormat(data.pdg_data);
        }

        // Fallback to default layout
        return createDefaultPDGLayout();
      } catch (error) {
        console.error("Error parsing PDG data:", error);
        return createDefaultPDGLayout();
      }
    },
    [createDefaultPDGLayout, transformPDGFormat, parseDOTFormat]
  );

  // Xử lý dữ liệu PDG khi component được cung cấp pdgData
  useEffect(() => {
    if (pdgData) {
      try {
        // Phân tích dữ liệu PDG từ API
        const graph = parsePDGData(pdgData);
        setProcessedData(graph);
      } catch (error) {
        console.error("Failed to parse PDG data:", error);
        // Sử dụng dữ liệu mẫu nếu parse lỗi
        setProcessedData(createDefaultPDGLayout());
      }
    }
  }, [pdgData, parsePDGData, createDefaultPDGLayout]);

  // Vẽ PDG khi processedData thay đổi
  useEffect(() => {
    if (!svgRef.current || !processedData) return;

    const { nodes, edges } = processedData;

    // Clear existing SVG content
    const svg = svgRef.current;
    svg.innerHTML = "";

    // Create a background
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "#f9fafb");
    svg.appendChild(rect);

    // Draw edges first (so they appear behind nodes)
    edges.forEach((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);

      if (sourceNode && targetNode) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttribute("x1", sourceNode.x);
        line.setAttribute("y1", sourceNode.y);
        line.setAttribute("x2", targetNode.x);
        line.setAttribute("y2", targetNode.y);
        line.setAttribute("stroke", "#94a3b8");
        line.setAttribute("stroke-width", "1.5");
        svg.appendChild(line);
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "30");
      circle.setAttribute("fill", node.isVulnerable ? "#fee2e2" : "#dbeafe");
      circle.setAttribute("stroke", node.isVulnerable ? "#ef4444" : "#3b82f6");
      circle.setAttribute("stroke-width", "2");
      group.appendChild(circle);

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", node.x);
      text.setAttribute("y", node.y + 5);
      text.setAttribute("font-size", "12");
      text.setAttribute("text-anchor", "middle");
      text.textContent = node.label;
      group.appendChild(text);

      svg.appendChild(group);
    });

    // Add legend
    const legendText = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    legendText.setAttribute("x", "450");
    legendText.setAttribute("y", "380");
    legendText.setAttribute("font-size", "10");
    legendText.setAttribute("fill", "#6b7280");
    legendText.textContent = "Highlighted in red: Vulnerable code block";
    svg.appendChild(legendText);
  }, [processedData]);

  return (
    <div className="border border-gray-300 rounded-lg p-4 flex justify-center">
      {processedData ? (
        <svg
          ref={svgRef}
          width="600"
          height="400"
          className="max-w-full"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">No PDG data available</p>
        </div>
      )}
    </div>
  );
};

export default PDGVisualization;
