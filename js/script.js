async function loadElements() {
  // Load JSON file
  const response = await fetch("data/elements.json");

  // Convert response to JS object
  const elements = await response.json();

  // Get table body
  const tableBody = document.querySelector("#elementsTable tbody");

  // Create rows
  elements.forEach(element => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${element.number}</td>
      <td>${element.symbol}</td>
      <td>${element.name}</td>
      <td>${element.electronic_configuration}</td>
      <td>${element.s}</td>
      <td>${element.f}</td>
      <td>${element.d}</td>
      <td>${element.p}</td>
      <td>${element.period}</td>
      <td>${element.group}</td>
      <td>${element.is_main_gp}</td>
      <td>${element.atomic_mass}</td>
      <td>${element.is_one_isotope}</td>
      <td>${element.mark}</td>
    `;

    tableBody.appendChild(row);
  });
}

loadElements();