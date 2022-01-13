const alph = "abcdefghijklmnopqrstuvwxyz";

function enc_word(key, data) {
  const data_parsed = data.replace(/\s/g, "").toUpperCase();
  const dataSet = Array.from(alph.toUpperCase());
  var encrypted = "";
  Array.from(data_parsed).forEach((letter) => {
    var parsed_key = key;
    if (key < 0) parsed_key = dataSet.length + (key % dataSet.length);

    if (dataSet.indexOf(letter) !== -1) {
      encrypted +=
        dataSet[(dataSet.indexOf(letter) + parsed_key) % dataSet.length];
    } else {
      encrypted += letter;
    }
  });
  return encrypted;
}

function cipher_enc(key, data) {
  var words = data.replaceAll(/[\t\n\s]/g, " ").split(" ");
  return words.map((e) => enc_word(key, e)).join(" ");
}

export function isNumeric(str) {
  //if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseInt(str))
  ); // ...and ensure strings of whitespace fail
}

export function removePolishChars(data) {
  return data
    .replaceAll("Ą", "A")
    .replaceAll("Ę", "E")
    .replaceAll("Ć", "C")
    .replaceAll("Ł", "L")
    .replaceAll("Ź", "Z")
    .replaceAll("Ż", "Z")
    .replaceAll("Ń", "N")
    .replaceAll('Ó',"O")
    .replaceAll("Ś", "S");
}

export default cipher_enc;
