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
let articlesInfo = [];
let selectedSymbol = "";

async function loadArticles() {
    const response = await fetch("data/articles.json");
    articlesInfo = await response.json();
    console.log(articlesInfo)
}
loadArticles();

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
                selectedSymbol = foundElement.symbol;
                console.log(selectedSymbol)
            });
        }
        periodicTable.appendChild(btn);
    });
}

loadElements();

async function loadRadii() {
    // selectedSymbol = "La"
    const response = await fetch("data/radii.json");
    const elements = await response.json();

    let filtered;
    if (selectedSymbol) {
        filtered = elements.filter(e => e.symbol === selectedSymbol);
    }
    else {
        filtered = elements;
    }
    // const filtered = elements.filter(e => e.symbol === selectedSymbol);

// Caption of the table
    const table = document.getElementById("Information");
    const oldCaption = table.querySelector("caption");
    if (oldCaption) {
        oldCaption.remove();
    }
    const caption = document.createElement("caption");
    caption.textContent = "Information about covalent and ionic radii";
    caption.classList.add("caption-top");
    table.appendChild(caption);

// Table content
    const tableBody = document.querySelector("#Information tbody");
    document.querySelector("#Information tbody").innerHTML = "";

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Number</th>
        <th>Symbol</th>
        <th>Charge</th>
        <th>Period</th>
        <th>ns</th>
        <th>(n-2)f</th>
        <th>(n-1)d</th>
        <th>np</th>
        <th>Coordination Number</th>
        <th>High Spin</th>
        <th>Covalent Radius</th>
        <th>Ionic Radius</th>
        <th>Reference</th>
    `;
    tableBody.appendChild(headerRow);

    filtered.forEach(element => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${element.number}</td>
        <td>${element.symbol}</td>
        <td>${element.charge}</td>
        <td>${element.period}</td>
        <td>${element.s}</td>
        <td>${element.f}</td>
        <td>${element.d}</td>
        <td>${element.p}</td>
        <td>${element.coordination_number}</td>
        <td>${element.is_high_spin}</td>
        <td>${element.covalent_radius}</td>
        <td>${element.ionic_radius}</td>
        <td><a href="javascript:void(0);" class="link-success" 
                onclick="showReferenceModal('${element.doi}')">${element.reference}</a></td>
        `;

        tableBody.appendChild(row);
    });
}


const link = document.getElementById("referenceAtomicMass");

document.getElementById("referenceAtomicMass").addEventListener("click", function (e) {
    e.preventDefault();
    showReferenceModal("10.1515/pac-2015-0305");
});

function showReferenceModal(articleDOI) {
    const modalEl = document.getElementById('referenceModal');
    const referenceModalBody = document.getElementById('referenceModalBody');

    const modalData = articlesInfo.find(item => item.doi === articleDOI);

    // console.log(modalData);

    if (!modalData) {
        referenceModalBody.innerHTML = "<p>No data found</p>";
        return;
    }

    let tableHTML = `
        <table class="table table-striped table-bordered">
            <tbody>
    `;

    const selectedKeys = [
        'doi',
        'authors',
        'title',
        'journal',
        'volume',
        'issue',
        'pages'
    ];

    selectedKeys.forEach(key => {
        if (modalData.hasOwnProperty(key)) {
            tableHTML += `
                <tr>
                    <td><strong>${key}</strong></td>
                    <td>${modalData[key]}</td>
                </tr>
            `;
        }
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    referenceModalBody.innerHTML = tableHTML;

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
}