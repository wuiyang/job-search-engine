// https://medium.com/binary-passion/lets-turn-an-iso-country-code-into-a-unicode-emoji-shall-we-870c16e05aad

// 127397 = regional indicator A (127,462) - A (65)
export default function ToCountryEmoji(countryIsoCode: string) {
  if (countryIsoCode == null || countryIsoCode.length !== 2) {
    return '';
  }
  
  return countryIsoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397) );
}