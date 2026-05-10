const elements = [
         "H", "",   "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "","He",
        "Li","Be",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "", "B", "C", "N", "O", "F","Ne",
        "Na","Mg",  "",  "",  "",  "",  "",  "",  "",  "",  "",  "","Al","Si", "P", "S","Cl","Ar",
         "K","Ca","Sc","Ti", "V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr",
        "Rb","Sr", "Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te", "I","Xe",
        "Cs","Ba","Ln","Hf","Ta", "W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn",
        "Fr","Ra","An","Rf","Db","Sg","Bh","Hs","Mt","Ds","Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og",
          "", "","Ln:","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu",
          "", "","An:","Ac","Th","Pa", "U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr"
];

let elementsInfo = [];

async function loadElements() {
    const response = await fetch("data/elements.json");
    elementsInfo = await response.json();
    createButtons();
    // console.log(elementsInfo)
}

function createButtons() {
    const periodicTable = document.getElementById("containerTable");
    elements.forEach(element => {
        const btn = document.createElement("button");
        if (element === "") {
            btn.classList.add("empty");
        } else {
            btn.textContent = element;
            const foundElement =
                elementsInfo.find(e => e.symbol === element);
                const markClass = {
                    s: "btn-outline-danger fw-bold",
                    p: "btn-outline-primary fw-bold",
                    d: "btn-outline-success fw-bold",
                    f: "btn-outline-warning fw-bold",
                    n: "btn-outline-info fw-bold"
                };

                if (!foundElement) {
                    btn.className = "btn btn-outline-secondary fw-bold";
                    btn.disabled = true;
                } else {
                    btn.className = "btn " + (markClass[foundElement.mark] || "btn-outline-dark fw-bold");
                }

            btn.addEventListener("click", () => {
                console.log(foundElement);
                document.getElementById("elSymbol").textContent = foundElement.symbol;
                document.getElementById("elName").textContent = foundElement.name;
                document.getElementById("elNumber").textContent = foundElement.number;
                document.getElementById("elElecConf").textContent = foundElement.electronic_configuration;
                document.getElementById("elAtomMass").textContent = foundElement.atomic_mass;
            });
        }
        periodicTable.appendChild(btn);
    });
}

loadElements();

// async function loadElements() {
//   // Load JSON file
//   const response = await fetch("data/elements.json");

//   // Convert response to JS object
//   const elements = await response.json();

//   // Get table body
//   const tableBody = document.querySelector("#elementsTable tbody");

//   // Create rows
//   elements.forEach(element => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//       <td>${element.number}</td>
//       <td>${element.symbol}</td>
//       <td>${element.name}</td>
//       <td>${element.electronic_configuration}</td>
//       <td>${element.s}</td>
//       <td>${element.f}</td>
//       <td>${element.d}</td>
//       <td>${element.p}</td>
//       <td>${element.period}</td>
//       <td>${element.group}</td>
//       <td>${element.is_main_gp}</td>
//       <td>${element.atomic_mass}</td>
//       <td>${element.is_one_isotope}</td>
//       <td>${element.mark}</td>
//     `;

//     tableBody.appendChild(row);
//   });
// }

// loadElements();