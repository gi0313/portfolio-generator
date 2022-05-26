const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('PLease enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            maessage: 'Enter your GitHub Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('PLease enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
};
const promptProject = portfolioData => {//<-a parameter that will store the project data.
//Added the projects array to the portfolioData object and initialized it as an empty array.
    // If there's no 'projects' array property, create one; would essentially erase all the project data we collected. 
    //We want this expression to occur on the first pass only.
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log('============Add a New Project==============');
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectInput => {
                if (projectInput) {
                    return true;
                } else {
                    console.log('PLease enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descInput => {
                if (descInput) {
                    return true;
                } else {
                    console.log('PLease enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('PLease enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feaure',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
//we use the array method push() to place the projectData from inquirer into the new projects array we just created.
    if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
//In this condition^, we're evaluating the user response to whether they wish to add more projects. 
//This response was captured in the answer object, projectData, in the property confirmAddProject. 
//If the user wishes to add more projects, then this condition will evaluate to true and call the promptProject(portfolioData) function.
    } else {
//If the user decides not to add more projects, then the condition will evaluate to false and trigger the following statement
        return portfolioData;
    }
    })
};
//So, here we're calling a function that returns the result of inquire.prompt, which is a Promise. 
//We therefore append the .then() method to the function call, since it returns a Promise, and we put into .then() 
//whatever we wish to take place after the Promise is resolved.
    promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');
// const pageHTML = generatePage(name,github);

 //const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     }
//      IS THE SAME AS
// profileDataArr.forEach((profileItem) => {
//     console.log(profileItem)
// }); Can also be written with no parenthesis in parameter and no curly bracets
// profileDataArr.forEach(profileItem =>console.log(profileItem));
// };
// printProfileData(profileDataArgs);
// const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;

//           name           data                   callback function
// fs.writeFile('./index.html', pageHTML, err => {
//     if(err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });