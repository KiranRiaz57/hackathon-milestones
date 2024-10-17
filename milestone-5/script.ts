const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement;
const shareableLink = document.getElementById("shareable-link") as HTMLDivElement;
const shareable = document.getElementById("shareable") as HTMLAnchorElement;
const downloadPDF = document.getElementById("download-pdf") as HTMLButtonElement;


form.addEventListener("submit", (event: Event) => {
     event.preventDefault();

const username = (document.getElementById("username") as HTMLInputElement).value;
const name = (document.getElementById("name") as HTMLInputElement).value;
const email = (document.getElementById("email") as HTMLInputElement).value;
const phone = (document.getElementById("phone") as HTMLInputElement).value;
const education = (document.getElementById("education") as HTMLTextAreaElement).value;
const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

//save form data in localStorage with the username as key
const resumeData = {
    name,
    email,
    phone,
    education,
    experience,
    skills,
};
localStorage.setItem(username, JSON.stringify(resumeData));

//generate the resume content dynamically
const resumeHTML = `
<h2>Editable Resume</h2>
<h3>Personal Information</h3>
<p><b>Name:</b> <span contenteditable="true">${name}</span></p>
<p><b>Email:</b> <span contenteditable="true">${email}</span></p>
<p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>

<h3>Education</h3>
<p contenteditable="true">${education}</p>

<h3>Experience</h3>
<p contenteditable="true">${experience}</p>

<h3>Skills</h3>
<p contenteditable="true">${skills}</p>
`;
//display the generate resume

    resumeDisplayElement.innerHTML = resumeHTML;
//generate a shareable URL with the username only 
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(username)}`;

//display the shareable link
shareableLink.style.display = "block";
shareable.href = shareableURL;
shareable.textContent = shareableURL;
});

//handle PDF download
downloadPDF.addEventListener('click', () =>{
    window.print() //save pdf
});
//prefill form based on the username in the URL
window.addEventListener('DOMContentLoaded',() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if(username) {
        //autofill
        const savedReumeData = localStorage.getItem(username);

        if(savedReumeData){
            const resumeData = JSON.parse(savedReumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
        
    }


});