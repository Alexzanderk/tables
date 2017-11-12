const data = require('./../test.json');
const dataRow = require('./../test2.json');

export const app = (function () {

    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);

        Object.keys(props).forEach(key => {
            if ('dataset' === key) {
                Object.keys(props[key]).forEach(dataKey => element.dataset[dataKey] = props[key][dataKey]);
            } else {
                element[key] = props[key]
            }
        });

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

        const fragment = document.createDocumentFragment();
        const jsonTitles = [];

        Object.keys(data).forEach(key => jsonTitles.push(data[key]));
        jsonTitles.map(key => {
            const aLink = createElement('a', { className: 'btnHead headLink', dataset: { 'type': key.type }, href: '#' }, key.title);
            fragment.appendChild(createElement('th', { className: 'th' }, aLink));
        });

        const row = createElement('tr', { className: 'tr' }, fragment);
        const thead = createElement('thead', { className: 'thead' }, row);
        const tbody = createElement('tbody', { className: 'tbody' });

        const table = createElement('table', { className: 'table', id: 'table' }, thead, tbody);

        tableContainer.appendChild(table);

    }
    /**  uncomment when build
    function addRow() {
        const theadRow = document.querySelector('.thead>.tr');
        const theadCell = theadRow.children;
        const cellLength = theadCell.length;
        const tbody = document.querySelector('.tbody');
        const fragment = document.createDocumentFragment();
        const btnControlDelete = createElement('button', { className: 'btn_control btn_delete', dataset:{ 'action': 'delete'} }, 'del');
        const btnControlCopy = createElement('button', { className: 'btn_control btn_copy', dataset:{ 'action': 'copy'} }, 'copy');
        const btnControlPaste = createElement('button', { className: 'btn_control btn_paste', dataset:{ 'action': 'paste'} }, 'past');
        const controllContainer = createElement('div', { className: 'controll_container' }, btnControlDelete, btnControlCopy, btnControlPaste);

        for (let i = 0; i < cellLength; i++) {
            const cellInput = createElement('input', { className: 'input', type: 'text' });
            const cellLabel = createElement('label', { className: 'label' });

            fragment.appendChild(createElement('td', { className: 'td' }, cellInput, cellLabel));
        };

        const row = createElement('tr', { className: 'tr' }, fragment, controllContainer);
        tbody.appendChild(row);
        bindEvents();
    }
    **/
    //dev function delete when build
    function addRow(indexData) {
        const theadRow = document.querySelector('.thead>.tr');
        const theadCell = theadRow.children;
        const cellLength = theadCell.length;
        const tbody = document.querySelector('.tbody');
        const fragment = document.createDocumentFragment();
        const btnControlDelete = createElement('button', { className: 'btn_control btn_delete', dataset: { 'action': 'delete' } }, 'del');
        const btnControlCopy = createElement('button', { className: 'btn_control btn_copy', dataset: { 'action': 'copy' } }, 'copy');
        const btnControlPaste = createElement('button', { className: 'btn_control btn_paste', dataset: { 'action': 'paste' } }, 'past');
        const controllContainer = createElement('div', { className: 'controll_container' }, btnControlDelete, btnControlCopy, btnControlPaste);

        if (indexData == dataRow) {
            const json = [];   //delete
            const frag = document.createDocumentFragment();

            Object.keys(indexData).forEach(key => json.push(indexData[key]));

            // console.log(json);
            json.map(row => {
                Object.keys(row).forEach(cell => {
                    const cellInput = createElement('input', { className: 'input', dataset: { 'type': row[cell].type }, type: 'text' });
                    const cellLabel = createElement('label', { className: 'label', dataset: { 'type': row[cell].type }, }, row[cell].title);

                    frag.appendChild(createElement('td', { className: 'td' }, cellInput, cellLabel));
                });
                const btnControlDelete = createElement('button', { className: 'btn_control btn_delete', dataset: { 'action': 'delete' } }, 'del');
                const btnControlCopy = createElement('button', { className: 'btn_control btn_copy', dataset: { 'action': 'copy' } }, 'copy');
                const btnControlPaste = createElement('button', { className: 'btn_control btn_paste', dataset: { 'action': 'paste' } }, 'past');
                const controllContainer = createElement('div', { className: 'controll_container' }, btnControlDelete, btnControlCopy, btnControlPaste);
                const rows = createElement('tr', { className: 'tr' }, frag, controllContainer);
                fragment.appendChild(rows);
            });
            tbody.appendChild(fragment);
            bindEvents();

        } else {
            for (let i = 0; i < cellLength; i++) {
                const cellInput = createElement('input', { className: 'input', type: 'text' });
                const cellLabel = createElement('label', { className: 'label' });

                fragment.appendChild(createElement('td', { className: 'td' }, cellInput, cellLabel));
            };

            const row = createElement('tr', { className: 'tr' }, fragment, controllContainer);
            tbody.appendChild(row);
            bindEvents();
        }
    }

    function removeTable() {
        const table = document.getElementById('table');

        if (table) tableContainer.removeChild(table);
    }

    function writeCell(e) {
        // debugger;
        const thisTd = this;
        const table = this.parentNode.parentNode;
        const cells = table.querySelectorAll('td');
        const focusedInput = document.querySelector('#focus');
        const editClass = table.querySelectorAll('.td.edit');
        const label = this.querySelector('.label');
        const input = this.querySelector('.input');

        const inputKeyListener = (e) => {
            if (e.keyCode === 13) {
                label.innerText = input.value;
                thisTd.classList.remove('edit');
                input.removeAttribute('id');
            } else if (e.keyCode === 27) {
                thisTd.classList.remove('edit');
                input.removeAttribute('id');
            }
        }

        if (!thisTd.classList.contains('edit')) {
            if (focusedInput !== null) {
                editClass.forEach(key => {
                    if (key.classList.contains('edit')) {
                        const oldLabel = key.querySelector('.label');
                        const oldInput = key.querySelector('.input');
                        oldLabel.innerText = oldInput.value;
                    }
                })
                focusedInput.removeAttribute('id');
            }

            editClass.forEach(key => key.classList.remove('edit'));
            input.id = 'focus';
            input.value = label.innerText;
        } else {
            label.innerText = input.value;
            focusedInput.removeAttribute('id');
        }

        this.classList.toggle('edit');
        input.addEventListener('keydown', inputKeyListener);
        input.focus();
    }

    function btnRowAction() {
        const dataAction = this.getAttribute('data-action');
        const row = this.parentNode.parentNode;
        const tbody = row.parentNode;

        if (dataAction === 'delete') {
            tbody.removeChild(row);
        } else if (dataAction === 'copy') {
            let copyRow;

            buffer = document.createDocumentFragment();
            copyRow = row.cloneNode(true);
            buffer.appendChild(copyRow);
        } else if (dataAction === 'paste') {
            const rowNext = row.nextElementSibling;
            let copyBuffer;

            copyBuffer = null;
            copyBuffer = buffer.cloneNode(true);
            tbody.insertBefore(copyBuffer, rowNext)
            bindEvents();
        }
    }

    function sortTable(e) {
        e.preventDefault();

        const findElement = (that, id) => {
            let elem = that.parentNode;
            if (elem.className === id) {
                return elem;
            } else {
                return findElement(elem, id);
            }
        }

        const cellIndex = this.parentNode.cellIndex;
        const table = findElement(this, 'table');
        const elementAttribute = this.getAttribute('data-type');
        const sortButtons = table.querySelectorAll('th');
        const sortButton = sortButtons[cellIndex];

        function sortTableGrid(cellIndex, type) {
            const tbody = table.querySelector('tbody');
            const rowsArray = [].slice.call(tbody.rows);


            if (sortButton.getAttribute('data-sort') == 'asc') {
                const compare = function (rowA, rowB) {
                    if (type === 'number') {
                        sortButtons[cellIndex].setAttribute('data-sort', 'desc');
                        return +rowB.cells[cellIndex].innerText - +rowA.cells[cellIndex].innerText;
                    } else if (type === 'string') {
                        sortButtons[cellIndex].setAttribute('data-sort', 'desc');
                        return rowA.cells[cellIndex].innerText < rowB.cells[cellIndex].innerText;
                    }
                };
                rowsArray.sort(compare);
            } else if (sortButton.getAttribute('data-sort') == 'desc') {
                const compare = function (rowA, rowB) {
                    if (type === 'number') {
                        sortButtons[cellIndex].setAttribute('data-sort', 'asc');
                        return +rowA.cells[cellIndex].innerText - +rowB.cells[cellIndex].innerText;
                    } else if (type === 'string') {
                        sortButtons[cellIndex].setAttribute('data-sort', 'asc');
                        return rowA.cells[cellIndex].innerText > rowB.cells[cellIndex].innerText;
                    }
                };
                rowsArray.sort(compare);
            } else {
                sortButtons.forEach(element => element.removeAttribute('data-sort'));

                const compare = function (rowA, rowB) {
                    if (type === 'number') {
                        sortButtons[cellIndex].setAttribute('data-sort', 'asc');
                        return +rowA.cells[cellIndex].innerText - +rowB.cells[cellIndex].innerText;
                    } else if (type === 'string') {
                        sortButtons[cellIndex].setAttribute('data-sort', 'asc');
                        return rowA.cells[cellIndex].innerText > rowB.cells[cellIndex].innerText;
                    }
                };
                rowsArray.sort(compare);
            }

            table.removeChild(tbody);

            for (var i = 0; i < rowsArray.length; i++) {
                tbody.appendChild(rowsArray[i]);
            }

            table.appendChild(tbody);
        }

        sortTableGrid(cellIndex, elementAttribute);
    }

    // cash DOM
    const btnCreateTableFrame = document.getElementById('btnCreateTableFrame');
    const btnAddRow = document.getElementById('btnAddRow');
    const btnDeleteTBody = document.getElementById('btnDeleteTBody');
    const tableContainer = document.getElementById('tableContainer');
    let buffer;

    btnCreateTableFrame.addEventListener('click', createTableFrame);
    btnDeleteTBody.addEventListener('click', removeTable);
    btnAddRow.addEventListener('click', addRow);

    function bindEvents() {
        const cells = document.querySelectorAll('tbody>tr>.td');
        const controllContainer = document.querySelectorAll('.btn_control');
        const sortCell = document.querySelectorAll('.thead>.tr>.th>.headLink');

        cells.forEach(key => key.addEventListener('dblclick', writeCell, false));
        controllContainer.forEach(key => key.addEventListener('click', btnRowAction));
        sortCell.forEach(key => key.addEventListener('click', sortTable));
    }


    createTableFrame(); //delete when build
    addRow(dataRow);//delete when build
    addRow(dataRow);//delete when build



})();




