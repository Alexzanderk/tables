const data = require('./../test.json');

// Object.keys(data).forEach(key => data[key].title);
// const titles = Object.values(data).map(o => o.title);
// console.log(titles);



export const app = (function() {
    // cash DOM
    const btnCreateTableFrame = document.getElementById('btnCreateTableFrame');
    const btnAddRow = document.getElementById('btnAddRow');
    const btnDeleteTBody = document.getElementById('btnDeleteTBody');
    const tableContainer = document.getElementById('tableContainer');
    
    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);
        
        Object.keys(props).forEach(key => element[key] = props[key]);

        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
    
                element.appendChild(child);
            })
        }
        return element;
    }
    
    function createTableFrame() {
        if (document.getElementById('table')) return null;
        
        let jsonTitles = [];
        let fragment = document.createDocumentFragment();
        
        Object.keys(data).forEach(key => jsonTitles.push(data[key].title));
        
        jsonTitles.map(key => fragment.appendChild(createElement('td', {className: 'td'}, key)));
        
        const row = createElement('tr', {className: 'tr'}, fragment);
        const thead = createElement('thead', {className: 'thead'}, row);
        const tbody = createElement('tbody', {className: 'tbody'});

        const table = createElement('table', {className: 'table', id: 'table'}, thead, tbody);
        
        return tableContainer.appendChild(table);
       
    }

    function addRow() {
        const theadRow = document.querySelector('.thead>.tr');
        const theadCell = theadRow.children;
        const cellLength = theadCell.length;
        
        let tbody = document.querySelector('.tbody');

        let fragment = document.createDocumentFragment();

        for(let i = 0; i < cellLength; i++) {
            fragment.appendChild(createElement('td', {className: 'td'}));
        };
        const row = createElement('tr', {className: 'tr'}, fragment);

        return tbody.appendChild(row);

    }

    function removeTable() {
        let table = document.getElementById('table');
        
        if (table) tableContainer.removeChild(table);
    }

    btnCreateTableFrame.addEventListener('click', createTableFrame);
    btnDeleteTBody.addEventListener('click', removeTable);
    btnAddRow.addEventListener('click', addRow);

})();