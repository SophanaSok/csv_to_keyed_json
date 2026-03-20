// CSV to Keyed JSON Converter - Main JavaScript
class CSVToJSONConverter {
    constructor() {
        this.parsedData = null;
        this.headers = [];
        this.jsonOutput = "";
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const fileInput = document.getElementById("fileInput");
        const convertBtn = document.getElementById("convertBtn");
        const downloadBtn = document.getElementById("downloadBtn");
        const readmeLink = document.getElementById("readmeLink");
        const modal = document.getElementById("readmeModal");
        const closeBtn = document.querySelector(".close");

        if (fileInput) {
            fileInput.addEventListener("change", (e) => this.handleFileUpload(e));
        }
        if (convertBtn) {
            convertBtn.addEventListener("click", () => this.convert());
        }
        if (downloadBtn) {
            downloadBtn.addEventListener("click", () => this.download());
        }
        if (readmeLink) {
            readmeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.showReadme();
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
        // Close modal when clicking outside
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const encoding = document.getElementById("encoding").value;
        const delimVal = document.getElementById("delimiter").value;

        Papa.parse(file, {
            encoding,
            delimiter: delimVal === "auto" ? "" : delimVal,
            header: document.getElementById("headerRow").checked,
            skipEmptyLines: true,
            complete: (results) => this.onParseComplete(results),
            error: (err) => this.showError("Parse error: " + err.message)
        });
    }

    onParseComplete(results) {
        this.parsedData = results.data;
        this.headers = results.meta.fields || Object.keys(this.parsedData[0] || {});
        this.updateKeyFieldSelect();
        this.updateStatus(`✅ Loaded ${this.parsedData.length} rows, ${this.headers.length} columns`);
    }

    updateKeyFieldSelect() {
        const keySelect = document.getElementById("keyField");
        if (!keySelect) return;

        keySelect.innerHTML = this.headers.map((header, index) =>
            `<option value="${index}">${header}</option>`
        ).join("");
    }

    castValue(value) {
        if (!document.getElementById("autoTypes").checked) return value;
        if (value === "" || value === undefined) return value;

        if (document.getElementById("nullify").checked && value.toUpperCase() === "NULL") {
            return null;
        }

        const lowerValue = value.toLowerCase();
        if (lowerValue === "true") return true;
        if (lowerValue === "false") return false;

        const numberValue = Number(value);
        if (!isNaN(numberValue) && value.trim() !== "") return numberValue;

        return value;
    }

    applyCase(str) {
        const caseOption = document.getElementById("caseOption").value;
        switch (caseOption) {
            case "lower": return str.toLowerCase();
            case "upper": return str.toUpperCase();
            default: return str;
        }
    }

    convert() {
        this.hideError();

        if (!this.parsedData) {
            this.showError("Please upload a CSV file first.");
            return;
        }

        const keyIndex = parseInt(document.getElementById("keyField").value);
        const keyField = this.headers[keyIndex];
        const skipEmpty = document.getElementById("skipEmpty").checked;
        const emptyNull = document.getElementById("emptyNull").checked;
        const terse = document.getElementById("terseMode").checked;

        const result = {};

        this.parsedData.forEach(row => {
            const keyVal = row[keyField];
            const obj = {};

            this.headers.forEach((header, index) => {
                if (index === keyIndex) return;

                let value = row[header];
                if (value === "" || value === undefined) {
                    if (skipEmpty) return;
                    value = emptyNull ? null : value;
                } else {
                    value = this.castValue(value);
                }

                obj[this.applyCase(header)] = value;
            });

            if (keyVal in result) {
                if (!Array.isArray(result[keyVal])) {
                    result[keyVal] = [result[keyVal]];
                }
                result[keyVal].push(obj);
            } else {
                result[keyVal] = obj;
            }
        });

        this.jsonOutput = terse ? this.formatTerse(result) : JSON.stringify(result, null, 2);

        const outputElement = document.getElementById("output");
        if (outputElement) {
            outputElement.value = this.jsonOutput;
        }

        const downloadBtn = document.getElementById("downloadBtn");
        if (downloadBtn) {
            downloadBtn.style.display = "inline-block";
        }

        this.updateStatus(`✅ Converted ${this.parsedData.length} rows → ${Object.keys(result).length} keys`);
    }

    formatTerse(result) {
        const lines = Object.entries(result).map(([key, value]) =>
            `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`
        );
        return `{\n${lines.join(",\n")}\n}`;
    }

    download() {
        if (!this.jsonOutput) return;

        const blob = new Blob([this.jsonOutput], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "converted.json";
        link.click();

        URL.revokeObjectURL(url);
    }

    showError(message) {
        const errorElement = document.getElementById("error");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }

    hideError() {
        const errorElement = document.getElementById("error");
        if (errorElement) {
            errorElement.style.display = "none";
        }
    }

    updateStatus(message) {
        const statusElement = document.getElementById("status");
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    showReadme() {
        fetch('README.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById('readmeContent').innerHTML = html;
                document.getElementById('readmeModal').style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading README:', error);
                this.showError('Failed to load README');
            });
    }
}

// Initialize the converter when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new CSVToJSONConverter();
});