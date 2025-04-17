import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Card from "../components/common/Card";
import { useAuth } from "../hooks/useAuth";


const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "getting-started", title: "Getting Started" },
    { id: "scan-process", title: "Scan Process" },
    { id: "pdg-visualization", title: "PDG Visualization" },
    { id: "vulnerability-types", title: "Vulnerability Types" },
    { id: "api-docs", title: "API Documentation" },
  ];

  // Check if user is authenticated
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  return (
    <MainLayout isAuthenticated={isAuthenticated}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
          <p className="mt-2 text-gray-600">
            Learn how to use VulCNN to detect vulnerabilities in your C/C++ code
          </p>
        </div>

        <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-6">
              <Card className="overflow-hidden">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </Card>
            </nav>
          </div>

          {/* Content */}
          <div className="mt-8 lg:mt-0 lg:col-span-9">
            <Card>
              <div className="lg:hidden mb-6">
                <label htmlFor="selected-section" className="sr-only">
                  Select a section
                </label>
                <select
                  id="selected-section"
                  name="selected-section"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={activeSection}
                  onChange={(e) => setActiveSection(e.target.value)}
                >
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.title}
                    </option>
                  ))}
                </select>
              </div>

              {activeSection === "introduction" && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Introduction to VulCNN
                  </h2>
                  <p>
                    VulCNN is an innovative vulnerability detection system that
                    uses deep learning to analyze C/C++ code for potential
                    security vulnerabilities. Unlike traditional static analysis
                    tools, VulCNN converts code into image-like representations
                    while preserving program semantics, then applies
                    convolutional neural networks (CNNs) to detect
                    vulnerabilities with high accuracy.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    How VulCNN Works
                  </h3>
                  <p>VulCNN consists of four main phases:</p>
                  <ol>
                    <li>
                      <strong>Graph Extraction:</strong> Given the source code
                      of a function, VulCNN normalizes it and performs static
                      analysis to extract the program dependency graph.
                    </li>
                    <li>
                      <strong>Sentence Embedding:</strong> Each node in the
                      program dependency graph corresponds to a line of code.
                      VulCNN treats a line of code as a sentence and embeds them
                      into vectors.
                    </li>
                    <li>
                      <strong>Image Generation:</strong> After sentence
                      embedding, VulCNN applies centrality analysis to obtain
                      the importance of all lines of code and multiplies them by
                      the vectors. The output is an image-like representation.
                    </li>
                    <li>
                      <strong>Classification:</strong> Given these generated
                      images, VulCNN uses a trained CNN model to detect
                      vulnerabilities.
                    </li>
                  </ol>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    Key Benefits
                  </h3>
                  <ul>
                    <li>
                      <strong>High Accuracy:</strong> VulCNN achieves better
                      accuracy than many state-of-the-art vulnerability
                      detectors.
                    </li>
                    <li>
                      <strong>Scalability:</strong> The system is designed to
                      handle large-scale code bases efficiently.
                    </li>
                    <li>
                      <strong>Visual Insights:</strong> VulCNN provides
                      visualizations that help understand vulnerability
                      patterns.
                    </li>
                  </ul>
                </div>
              )}

              {activeSection === "getting-started" && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Getting Started
                  </h2>
                  <p>
                    Follow these steps to start using VulCNN for vulnerability
                    detection in your C/C++ code:
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    Create an Account
                  </h3>
                  <p>
                    Start by creating an account on the VulCNN platform. Click
                    the "Sign In" button in the top right corner and then select
                    "Create a new account".
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    Create a Project
                  </h3>
                  <p>
                    After logging in, go to the "Projects" page and click "New
                    Project". Give your project a name and optional description
                    to organize your scans.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    Upload Files
                  </h3>
                  <p>
                    Navigate to your project and click "New Scan". Upload your
                    C/C++ files either by dragging and dropping them or using
                    the file browser.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    Start a Scan
                  </h3>
                  <p>
                    Configure scan options according to your needs and click
                    "Start Scan" to begin the vulnerability detection process.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    View Results
                  </h3>
                  <p>
                    Once the scan is complete, you can view the results,
                    including detected vulnerabilities, their severity, location
                    in code, and recommended fixes.
                  </p>
                </div>
              )}

              {activeSection === "scan-process" && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Scan Process
                  </h2>
                  <p>
                    Understanding how VulCNN scans your code can help you
                    interpret the results more effectively. Here's a detailed
                    explanation of the scan process:
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    1. Code Normalization
                  </h3>
                  <p>
                    When you upload C/C++ files, VulCNN first normalizes the
                    code to make it easier to analyze. This process includes:
                  </p>
                  <ul>
                    <li>Removing comments and string literals</li>
                    <li>Standardizing variable and function names</li>
                    <li>Resolving macros and preprocessor directives</li>
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    2. PDG Generation
                  </h3>
                  <p>
                    Next, VulCNN uses Joern, a code analysis platform, to
                    generate a Program Dependency Graph (PDG) for each function
                    in your code. The PDG represents:
                  </p>
                  <ul>
                    <li>
                      Control dependencies: how control flows through the code
                    </li>
                    <li>
                      Data dependencies: how data flows between variables and
                      operations
                    </li>
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    3. Image Generation
                  </h3>
                  <p>
                    VulCNN converts the PDG into an image-like representation:
                  </p>
                  <ul>
                    <li>
                      Each line of code is embedded into a vector using a
                      pre-trained Sent2Vec model
                    </li>
                    <li>
                      Centrality analysis determines the importance of each line
                    </li>
                    <li>
                      The vectors are weighted and arranged to form a
                      multi-channel image
                    </li>
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    4. Vulnerability Detection
                  </h3>
                  <p>
                    Finally, a trained Convolutional Neural Network (CNN)
                    analyzes the generated image to detect vulnerabilities:
                  </p>
                  <ul>
                    <li>
                      The CNN identifies patterns associated with common
                      vulnerabilities
                    </li>
                    <li>
                      Each potential vulnerability is assigned a confidence
                      score
                    </li>
                    <li>
                      Results are categorized by severity (high, medium, low)
                    </li>
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6">
                    5. Result Processing
                  </h3>
                  <p>
                    After detection, VulCNN processes the results to provide
                    actionable insights:
                  </p>
                  <ul>
                    <li>
                      Mapping vulnerabilities back to the original source code
                    </li>
                    <li>
                      Generating recommendations for fixing each vulnerability
                    </li>
                    <li>Creating comprehensive reports for further analysis</li>
                  </ul>
                </div>
              )}

              {/* Other sections content... */}
              {activeSection === "pdg-visualization" && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900">
                    PDG Visualization
                  </h2>
                  <p>
                    Program Dependency Graphs (PDGs) are a powerful way to
                    visualize code structure and identify vulnerabilities. This
                    section explains how to interpret PDG visualizations in
                    VulCNN.
                  </p>
                  {/* Content for PDG visualization */}
                </div>
              )}

              {activeSection === "vulnerability-types" && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Vulnerability Types
                  </h2>
                  <p>
                    VulCNN can detect various types of vulnerabilities in C/C++
                    code. Here are the main categories and examples:
                  </p>
                  {/* Content for vulnerability types */}
                </div>
              )}

              {activeSection === "api-docs" && (
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-gray-900">
                    API Documentation
                  </h2>
                  <p>
                    VulCNN provides a RESTful API for integrating vulnerability
                    detection into your development workflow.
                  </p>
                  {/* Content for API documentation */}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentationPage;
