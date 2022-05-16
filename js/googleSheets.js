var values = [
  [
    // Cell values ...
  ],
  // Additional rows ...
];
var body = {
  values: values
};
gapi.client.sheets.spreadsheets.values.update({
   spreadsheetId: spreadsheetId,
   range: range,
   valueInputOption: valueInputOption,
   resource: body
}).then((response) => {
  var result = response.result;
  console.log(`${result.updatedCells} cells updated.`);
});