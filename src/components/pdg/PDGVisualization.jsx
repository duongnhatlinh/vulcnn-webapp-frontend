import React, { useEffect, useRef } from "react";

// This is a simplified PDG visualization component
// In a real app, you might use a library like react-force-graph or d3.js

const PDGVisualization = ({ pdgData }) => {
  const svgRef = useRef(null);

  // For this example, we'll use a simplified mock PDG structure
  const mockPDG = {
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

  useEffect(() => {
    if (!svgRef.current) return;

    const { nodes, edges } = pdgData || mockPDG;

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
  }, [pdgData]);

  return (
    <div className="border border-gray-300 rounded-lg p-4 flex justify-center">
      <svg
        ref={svgRef}
        width="600"
        height="400"
        className="max-w-full"
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
    </div>
  );
};

export default PDGVisualization;
