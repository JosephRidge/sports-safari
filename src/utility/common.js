async function loadCSVData(triageDataPath) {
  try {
    const response = await fetch(triageDataPath);
    const text = await response.text();
    return Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        // Store the parsed data in triageData
        this.triageData = result.data;
      },
      skipEmptyLines: true,
    });
  } catch (error) {
    console.error("Error fetching CSV data:", error);
  }
}

export { loadCSVData };
