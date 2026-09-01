import React, { useState } from "react";
import "./CreateSurveyForm.css";
import Language from "../language/language"; // Adjust import path if needed

const CreateSurveyFrom = () => {
  const [country, setCountry] = useState(""); // State for country selection

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const form = e.target;
    const projectName = form.projectName.value;
    const SurveyName = form.SurveyName.value;
    const Completes = form.Completes.value;
    const country = form["country-language"].value;
    const status = form.status.value;
    
    console.log({
      projectName,
      SurveyName,
      Completes,
      status,
    
    });

    const response = await fetch("http://localhost:3000/survey/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        SurveyName,
        Completes,
        status,
        country
      }),
    });
    console.log("w",response)

    if (response.ok) {
        const result = await response.json();
        const surveyId = result.data.id;
        // Redirect to the next page with the survey ID
        window.location.href = `/dash/${surveyId}`;
    } else {
        alert("Failed to create Survey");
    } 

  };


  return (
    <>
      <form id="surveyForm" onSubmit={handleSubmit}>
        <label htmlFor="projectName">Project Name</label>
        <input type="text" id="projectName" name="projectName" required />

        <label htmlFor="SurveyName">Survey Name</label>
        <input type="text" id="SurveyName" name="SurveyName" required />

        <label htmlFor="Completes">Completes</label>
        <input type="number" id="Completes" name="Completes" required />

        <label htmlFor="status">Status</label>
        <select id="status" name="status" required>
          <option value="" disabled>
            Select status
          </option>
          <option value="live">Live</option>
          <option value="pause">Pause</option>
          <option value="finished">Finished</option>
        </select>
        <label htmlFor="language">Language </label>
        <select
          id="country-language"
          name="country-language"
          defaultValue=""
          required
        >
          <option  disabled selected>
            Select country and language
          </option>
          <option value="hong-kong-chinese-traditional">
            Hong Kong - Chinese Traditional
          </option>
          <option value="taiwan-chinese-traditional">
            Taiwan - Chinese Traditional
          </option>
          <option value="netherlands-dutch">Netherlands - Dutch</option>
          <option value="australia-english">Australia - English</option>
          <option value="canada-english">Canada - English</option>
          <option value="india-english">India - English</option>
          <option value="united-kingdom-english">
            United Kingdom - English
          </option>
          <option value="united-states-english">United States - English</option>
          <option value="france-french">France - French</option>
          <option value="germany-german">Germany - German</option>
          <option value="switzerland-german">Switzerland - German</option>
          <option value="italy-italian">Italy - Italian</option>
          <option value="japan-japanese">Japan - Japanese</option>
          <option value="poland-polish">Poland - Polish</option>
          <option value="brazil-portuguese">Brazil - Portuguese</option>
          <option value="portugal-portuguese">Portugal - Portuguese</option>
          <option value="russia-russian">Russia - Russian</option>
          <option value="argentina-spanish">Argentina - Spanish</option>
          <option value="colombia-spanish">Colombia - Spanish</option>
          <option value="mexico-spanish">Mexico - Spanish</option>
          <option value="spain-spanish">Spain - Spanish</option>
          <option value="sweden-swedish">Sweden - Swedish</option>
          <option value="korea-korean">Korea - Korean</option>
          <option value="canada-french">Canada - French</option>
          <option value="belgium-french">Belgium - French</option>
          <option value="united-states-spanish">United States - Spanish</option>
          <option value="belgium-dutch">Belgium - Dutch</option>
          <option value="saudi-arabia-arabic">Saudi Arabia - Arabic</option>
          <option value="norway-norwegian">Norway - Norwegian</option>
          <option value="denmark-danish">Denmark - Danish</option>
          <option value="finland-finnish">Finland - Finnish</option>
          <option value="switzerland-french">Switzerland - French</option>
          <option value="switzerland-italian">Switzerland - Italian</option>
          <option value="switzerland-english">Switzerland - English</option>
          <option value="turkey-turkish">Turkey - Turkish</option>
          <option value="austria-german">Austria - German</option>
          <option value="czech-republic-czech">Czech Republic - Czech</option>
          <option value="greece-greek">Greece - Greek</option>
          <option value="venezuela-spanish">Venezuela - Spanish</option>
          <option value="iceland-icelandic">Iceland - Icelandic</option>
          <option value="ireland-english">Ireland - English</option>
          <option value="romania-romanian">Romania - Romanian</option>
          <option value="bulgaria-bulgarian">Bulgaria - Bulgarian</option>
          <option value="chile-spanish">Chile - Spanish</option>
          <option value="south-africa-english">South Africa - English</option>
          <option value="singapore-english">Singapore - English</option>
          <option value="luxembourg-luxembourg">Luxembourg - Luxembourg</option>
          <option value="indonesia-indonesian">Indonesia - Indonesian</option>
          <option value="malaysia-malay">Malaysia - Malay</option>
          <option value="thailand-thai">Thailand - Thai</option>
          <option value="philippines-tagalog">Philippines - Tagalog</option>
          <option value="ukraine-ukrainian">Ukraine - Ukrainian</option>
          <option value="new-zealand-english">New Zealand - English</option>
          <option value="philippines-english">Philippines - English</option>
          <option value="indonesia-english">Indonesia - English</option>
          <option value="malaysia-english">Malaysia - English</option>
          <option value="hungary-hungarian">Hungary - Hungarian</option>
          <option value="latvia-latvian">Latvia - Latvian</option>
          <option value="costa-rica-spanish">Costa Rica - Spanish</option>
          <option value="el-salvador-spanish">El Salvador - Spanish</option>
          <option value="guatemala-spanish">Guatemala - Spanish</option>
          <option value="honduras-spanish">Honduras - Spanish</option>
          <option value="nicaragua-spanish">Nicaragua - Spanish</option>
          <option value="panama-spanish">Panama - Spanish</option>
          <option value="estonia-estonian">Estonia - Estonian</option>
          <option value="lithuania-lithuanian">Lithuania - Lithuanian</option>
          <option value="israel-hebrew">Israel - Hebrew</option>
          <option value="hong-kong-english">Hong Kong - English</option>
          <option value="germany-english">Germany - English</option>
          <option value="south-africa-zulu">South Africa - Zulu</option>
          <option value="india-hindi">India - Hindi</option>
          <option value="egypt-arabic">Egypt - Arabic</option>
          <option value="slovakia-slovak">Slovakia - Slovak</option>
          <option value="slovenia-slovene">Slovenia - Slovene</option>
          <option value="peru-spanish">Peru - Spanish</option>
          <option value="vietnam-vietnamese">Vietnam - Vietnamese</option>
          <option value="united-arab-emirates-arabic">
            United Arab Emirates - Arabic
          </option>
          <option value="qatar-arabic">Qatar - Arabic</option>
          <option value="nigeria-english">Nigeria - English</option>
          <option value="croatia-croatian">Croatia - Croatian</option>
          <option value="kazakhstan-russian">Kazakhstan - Russian</option>
          <option value="jordan-arabic">Jordan - Arabic</option>
          <option value="belgium-flemish">Belgium - Flemish</option>
          <option value="ecuador-spanish">Ecuador - Spanish</option>
          <option value="singapore-chinese-simplified">
            Singapore - Chinese Simplified
          </option>
          <option value="malaysia-chinese-simplified">
            Malaysia - Chinese Simplified
          </option>
          <option value="serbia-serbian">Serbia - Serbian</option>
          <option value="united-arab-emirates-english">
            United Arab Emirates - English
          </option>
          <option value="belgium-german">Belgium - German</option>
          <option value="netherlands-english">Netherlands - English</option>
          <option value="kenya-swahili">Kenya - Swahili</option>
          <option value="kenya-english">Kenya - English</option>
          <option value="china-english">China - English</option>
          <option value="france-english">France - English</option>
          <option value="russia-english">Russia - English</option>
          <option value="algeria-english">Algeria - English</option>
          <option value="lebanon-english">Lebanon - English</option>
          <option value="morocco-english">Morocco - English</option>
          <option value="algeria-arabic">Algeria - Arabic</option>
          <option value="lebanon-arabic">Lebanon - Arabic</option>
          <option value="morocco-arabic">Morocco - Arabic</option>
          <option value="argentina-english">Argentina - English</option>
          <option value="brazil-english">Brazil - English</option>
          <option value="colombia-english">Colombia - English</option>
          <option value="greece-english">Greece - English</option>
          <option value="israel-english">Israel - English</option>
          <option value="italy-english">Italy - English</option>
          <option value="japan-english">Japan - English</option>
          <option value="korea-english">Korea - English</option>
          <option value="mexico-english">Mexico - English</option>
          <option value="turkey-english">Turkey - English</option>
          <option value="united-states-korean">United States - Korean</option>
          <option value="united-states-vietnamese">
            United States - Vietnamese
          </option>
          <option value="spain-english">Spain - English</option>
          <option value="pakistan-english">Pakistan - English</option>
          <option value="pakistan-urdu">Pakistan - Urdu</option>
          <option value="austria-english">Austria - English</option>
          <option value="dominican-republic-spanish">
            Dominican Republic - Spanish
          </option>
          <option value="luxembourg-french">Luxembourg - French</option>
          <option value="puerto-rico-english">Puerto Rico - English</option>
          <option value="puerto-rico-spanish">Puerto Rico - Spanish</option>
          <option value="bangladesh-bengali">Bangladesh - Bengali</option>
          <option value="egypt-english">Egypt - English</option>
          <option value="mauritania-arabic">Mauritania - Arabic</option>
          <option value="tunisia-arabic">Tunisia - Arabic</option>
          <option value="tunisia-french">Tunisia - French</option>
          <option value="libya-arabic">Libya - Arabic</option>
          <option value="iraq-arabic">Iraq - Arabic</option>
          <option value="iraq-kurdish">Iraq - Kurdish</option>
          <option value="kuwait-arabic">Kuwait - Arabic</option>
          <option value="yemen-arabic">Yemen - Arabic</option>
          <option value="oman-arabic">Oman - Arabic</option>
          <option value="palestine-arabic">Palestine - Arabic</option>
          <option value="bahrain-arabic">Bahrain - Arabic</option>
          <option value="united-states-chinese-simplified">
            United States - Chinese Simplified
          </option>
          <option value="united-states-japanese">
            United States - Japanese
          </option>
          <option value="belgium-english">Belgium - English</option>
          <option value="chile-english">Chile - English</option>
          <option value="denmark-english">Denmark - English</option>
          <option value="finland-english">Finland - English</option>
          <option value="norway-english">Norway - English</option>
          <option value="saudi-arabia-english">Saudi Arabia - English</option>
          <option value="vietnam-english">Vietnam - English</option>
          <option value="indonesia-malay">Indonesia - Malay</option>
          <option value="singapore-malay">Singapore - Malay</option>
          <option value="malta-english">Malta - English</option>
          <option value="malta-maltese">Malta - Maltese</option>
          <option value="china-cantonese">China - Cantonese</option>
          <option value="poland-english">Poland - English</option>
          <option value="romania-english">Romania - English</option>
          <option value="sweden-english">Sweden - English</option>
          <option value="thailand-english">Thailand - English</option>
          <option value="hungary-english">Hungary - English</option>
          <option value="india-assamese">India - Assamese</option>
          <option value="india-bengali">India - Bengali</option>
          <option value="india-dogri">India - Dogri</option>
          <option value="india-gujrati">India - Gujrati</option>
          <option value="india-kannada">India - Kannada</option>
          <option value="india-kashmiri">India - Kashmiri</option>
          <option value="india-konkani">India - Konkani</option>
          <option value="india-maithili">India - Maithili</option>
          <option value="india-manipuri">India - Manipuri</option>
          <option value="india-marathi">India - Marathi</option>
          <option value="india-nepali">India - Nepali</option>
          <option value="india-odia">India - Odia</option>
          <option value="india-punjabi">India - Punjabi</option>
          <option value="india-sanskrit">India - Sanskrit</option>
          <option value="india-santali">India - Santali</option>
          <option value="india-sindhi">India - Sindhi</option>
          <option value="india-tamil">India - Tamil</option>
          <option value="india-telugu">India - Telugu</option>
          <option value="india-urdu">India - Urdu</option>
          <option value="bahamas-english">Bahamas - English</option>
          <option value="belize-english">Belize - English</option>
          <option value="bolivia-spanish">Bolivia - Spanish</option>
          <option value="jamaica-english">Jamaica - English</option>
          <option value="paraguay-spanish">Paraguay - Spanish</option>
          <option value="uruguay-spanish">Uruguay - Spanish</option>
          <option value="ethiopia-english">Ethiopia - English</option>
          <option value="ethiopia-amharic">Ethiopia - Amharic</option>
          <option value="algeria-french">Algeria - French</option>
          <option value="luxembourg-german">Luxembourg - German</option>
          <option value="luxembourg-english">Luxembourg - English</option>
          <option value="morocco-french">Morocco - French</option>
          <option value="united-states-arabic">United States - Arabic</option>
          <option value="chad-arabic">Chad - Arabic</option>
          <option value="comoros-arabic">Comoros - Arabic</option>
          <option value="djibouti-arabic">Djibouti - Arabic</option>
          <option value="angola-english">Angola - English</option>
          <option value="benin-english">Benin - English</option>
          <option value="botswana-english">Botswana - English</option>
          <option value="burkina-faso-english">Burkina Faso - English</option>
          <option value="cameroon-english">Cameroon - English</option>
          <option value="cape-verde-english">Cape Verde - English</option>
          <option value="chad-english">Chad - English</option>
          <option value="comoros-english">Comoros - English</option>
          <option value="republic-of-the-congo-english">
            Republic of the Congo - English
          </option>
          <option value="djibouti-english">Djibouti - English</option>
          <option value="equatorial-guinea-english">
            Equatorial Guinea - English
          </option>
          <option value="eritrea-english">Eritrea - English</option>
          <option value="gabon-english">Gabon - English</option>
          <option value="gambia-english">Gambia - English</option>
          <option value="ghana-english">Ghana - English</option>
          <option value="guinea-english">Guinea - English</option>
          <option value="guinea-bissau-english">Guinea-Bissau - English</option>
          <option value="kuwait-english">Kuwait - English</option>
          <option value="lesotho-english">Lesotho - English</option>
          <option value="liberia-english">Liberia - English</option>
          <option value="madagascar-english">Madagascar - English</option>
          <option value="malawi-english">Malawi - English</option>
          <option value="mali-english">Mali - English</option>
          <option value="mauritania-english">Mauritania - English</option>
          <option value="mauritius-english">Mauritius - English</option>
          <option value="mozambique-english">Mozambique - English</option>
          <option value="namibia-english">Namibia - English</option>
          <option value="niger-english">Niger - English</option>
          <option value="qatar-english">Qatar - English</option>
          <option value="republic-of-the-cote-d-ivoire-english">
            Republic of the Côte d'Ivoire - English
          </option>
          <option value="rwanda-english">Rwanda - English</option>
          <option value="sao-tome-and-principe-english">
            São Tomé and Príncipe - English
          </option>
          <option value="senegal-english">Senegal - English</option>
          <option value="seychelles-english">Seychelles - English</option>
          <option value="sierra-leone-english">Sierra Leone - English</option>
          <option value="swaziland-english">Swaziland - English</option>
          <option value="tanzania-english">Tanzania - English</option>
          <option value="togo-english">Togo - English</option>
          <option value="tunisia-english">Tunisia - English</option>
          <option value="uganda-english">Uganda - English</option>
          <option value="zambia-english">Zambia - English</option>
          <option value="benin-french">Benin - French</option>
          <option value="burkina-faso-french">Burkina Faso - French</option>
          <option value="cameroon-french">Cameroon - French</option>
          <option value="chad-french">Chad - French</option>
          <option value="comoros-french">Comoros - French</option>
          <option value="republic-of-the-congo-french">
            Republic of the Congo - French
          </option>
          <option value="djibouti-french">Djibouti - French</option>
          <option value="equatorial-guinea-french">
            Equatorial Guinea - French
          </option>
          <option value="gabon-french">Gabon - French</option>
          <option value="guinea-french">Guinea - French</option>
          <option value="mauritius-french">Mauritius - French</option>
          <option value="niger-french">Niger - French</option>
          <option value="republic-of-the-cote-d-ivoire-french">
            Republic of the Côte d'Ivoire - French
          </option>
          <option value="senegal-french">Senegal - French</option>
          <option value="seychelles-french">Seychelles - French</option>
          <option value="togo-french">Togo - French</option>
          <option value="angola-portuguese">Angola - Portuguese</option>
          <option value="mozambique-portuguese">Mozambique - Portuguese</option>
          <option value="lesotho-sesotho">Lesotho - Sesotho</option>
          <option value="equatorial-guinea-spanish">
            Equatorial Guinea - Spanish
          </option>
          <option value="portugal-english">Portugal - English</option>
          <option value="south-africa-afrikaans">
            South Africa - Afrikaans
          </option>
          <option value="canada-chinese-simplified">
            Canada - Chinese Simplified
          </option>
          <option value="myanmar-english">Myanmar - English</option>
          <option value="myanmar-burmese">Myanmar - Burmese</option>
          <option value="kazakhstan-kazakh">Kazakhstan - Kazakh</option>
          <option value="norway-bokmal">Norway - Bokmal</option>
          <option value="sri-lanka-sinhala">Sri Lanka - Sinhala</option>
          <option value="guyana-english">Guyana - English</option>
          <option value="tanzania-swahili">Tanzania - Swahili</option>
          <option value="bulgaria-english">Bulgaria - English</option>
          <option value="costa-rica-english">Costa Rica - English</option>
          <option value="croatia-english">Croatia - English</option>
          <option value="czech-republic-english">
            Czech Republic - English
          </option>
          <option value="dominican-republic-english">
            Dominican Republic - English
          </option>
          <option value="ecuador-english">Ecuador - English</option>
          <option value="el-salvador-english">El Salvador - English</option>
          <option value="estonia-english">Estonia - English</option>
          <option value="guatemala-english">Guatemala - English</option>
          <option value="honduras-english">Honduras - English</option>
          <option value="iceland-english">Iceland - English</option>
          <option value="iraq-english">Iraq - English</option>
          <option value="jordan-english">Jordan - English</option>
          <option value="latvia-english">Latvia - English</option>
          <option value="libyan-arab-jamahiriya-english">
            Libyan Arab Jamahiriya - English
          </option>
          <option value="lithuania-english">Lithuania - English</option>
          <option value="nicaragua-english">Nicaragua - English</option>
          <option value="oman-english">Oman - English</option>
          <option value="palestine-english">Palestine - English</option>
          <option value="panama-english">Panama - English</option>
          <option value="paraguay-english">Paraguay - English</option>
          <option value="peru-english">Peru - English</option>
          <option value="serbia-english">Serbia - English</option>
          <option value="slovakia-slovak-republic-english">
            Slovakia (Slovak Republic) - English
          </option>
          <option value="slovenia-english">Slovenia - English</option>
          <option value="sri-lanka-english">Sri Lanka - English</option>
          <option value="taiwan-province-of-china-english">
            Taiwan Province Of China - English
          </option>
          <option value="ukraine-english">Ukraine - English</option>
          <option value="uruguay-english">Uruguay - English</option>
          <option value="venezuela-english">Venezuela - English</option>
          <option value="yemen-english">Yemen - English</option>
          <option value="haiti-english">Haiti - English</option>
          <option value="cape-verde-portuguese">Cape Verde - Portuguese</option>
          <option value="equatorial-guinea-portuguese">
            Equatorial Guinea - Portuguese
          </option>
          <option value="eritrea-arabic">Eritrea - Arabic</option>
          <option value="guinea-bissau-portuguese">
            Guinea-Bissau - Portuguese
          </option>
          <option value="madagascar-french">Madagascar - French</option>
          <option value="mali-french">Mali - French</option>
          <option value="pakistan-punjabi">Pakistan - Punjabi</option>
          <option value="rwanda-french">Rwanda - French</option>
          <option value="sao-tome-and-principe-portuguese">
            São Tomé and Príncipe - Portuguese
          </option>
          <option value="haiti-french">Haiti - French</option>
          <option value="democratic-republic-of-the-congo-english">
            Democratic Republic of the Congo - English
          </option>
          <option value="democratic-republic-of-the-congo-french">
            Democratic Republic of the Congo - French
          </option>
          <option value="moldova-romanian">Moldova - Romanian</option>
          <option value="moldova-english">Moldova - English</option>
          <option value="uzbekistan-russian">Uzbekistan - Russian</option>
          <option value="uzbekistan-english">Uzbekistan - English</option>
          <option value="uzbekistan-uzbek">Uzbekistan - Uzbek</option>
        </select>

        {/* <Language onCountryChange={setCountry} /> */}

        <button type="submit">Create Survey</button>
      </form>
    </>
  );
};

export default CreateSurveyFrom;
