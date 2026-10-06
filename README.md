# CSV to Keyed JSON Converter

A simple, client-side web application that converts CSV (Comma-Separated Values) files into keyed JSON format. This tool transforms tabular CSV data into a JSON object where each row becomes a nested object keyed by a specified column value.

## Getting Started

To use the application:

1. Download or clone this repository
2. Open `index.html` in your web browser
3. The app runs entirely in your browser - no server required

For usage instructions within the app, click the "README" link at the top of the page to view this guide in a modal.

## Features

- **File Upload**: Support for CSV, TSV, and TXT files
- **Flexible Delimiters**: Auto-detection or manual selection of field separators (comma, tab, semicolon, pipe)
- **Encoding Support**: UTF-8 and ISO-8859-1 encodings
- **Key Field Selection**: Choose any column to use as the JSON object key
- **Data Type Detection**: Automatic conversion of numbers and booleans
- **Customization Options**:
  - Convert "NULL" strings to null values
  - Treat empty fields as null
  - Skip empty fields entirely
  - Case transformation for attribute names (as-is, lowercase, uppercase)
  - Header row detection
  - Terse mode output (one object per line)
- **Download Support**: Export converted JSON as a file
- **Real-time Preview**: View JSON output in a formatted textarea
- **In-App Help**: Access this README directly within the application via a modal

## Usage

1. **Load CSV File**: Click "Choose File" and select your CSV file
2. **Configure Options** (optional):
   - Select field separator if auto-detection fails
   - Choose encoding (default: UTF-8)
   - Pick the key field (column to use as JSON keys)
   - Adjust case options and data processing checkboxes
3. **Convert**: Click the "⚡ Convert" button
4. **Download**: Use "⬇ Download JSON" to save the result

## Example

Given a CSV file:
```csv
id,name,age,city
1,John,25,New York
2,Jane,30,London
3,Bob,35,Paris
```

With "id" selected as the key field, the output JSON will be:
```json
{
  "1": {
    "name": "John",
    "age": 25,
    "city": "New York"
  },
  "2": {
    "name": "Jane",
    "age": 30,
    "city": "London"
  },
  "3": {
    "name": "Bob",
    "age": 35,
    "city": "Paris"
  }
}
```

## Requirements

- Modern web browser with JavaScript enabled
- No internet connection needed: all libraries are in `assets/`

## Browser Support

Works in all modern browsers that support:
- File API
- ES6+ JavaScript features
- CSS Grid and Flexbox

## Project Structure

```
csv_to_keyed_json/
├── index.html         # Main HTML file with UI
├── script.js          # JavaScript logic (ES6 class-based)
├── styles.css         # CSS styles for the interface
├── assets/
│   ├── papaparse.min.js         # CSV parser (PapaParse 5.4.1)
│   ├── marked.min.js            # Markdown parser for in-app README display (marked 9.1.2)
│   ├── github-markdown.min.css  # Styling for the README modal (github-markdown-css 5.1.0)
│   └── *.LICENSE                # Licences of the bundled libraries
└── README.md          # This file
```

## Dependencies

- [PapaParse](https://www.papaparse.com/) - CSV parsing library
- [Marked](https://marked.js.org/) - Markdown parser for displaying README in-app
- [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css) - Styling for README modal

All three are copied byte for byte from cdnjs into `assets/` and served from this
site, so the page loads nothing from another origin and its Content-Security-Policy
can stay `'self'`. To check a copy, or after replacing it with a new version, compare
its hash with the `sri` value cdnjs publishes (cdnjs uses SHA-512):

```sh
openssl dgst -sha512 -binary assets/papaparse.min.js | base64 -w0; echo
curl -s 'https://api.cdnjs.com/libraries/PapaParse/5.4.1?fields=sri' | jq -r '.sri["papaparse.min.js"]'
```

Same for `marked/9.1.2` (`marked.min.js`) and `github-markdown-css/5.1.0`
(`github-markdown.min.css`). The two lines must print the same value.

## Privacy

This is a client-side application. Your CSV files are processed entirely in your browser and are never uploaded to any server.

## License

This project is open source. Feel free to use, modify, and distribute.
