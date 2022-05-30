//create the about section
//This function, generateAbout(), will accept the about variable as a parameter, 
//and if it doesn't exist, we'll simply return an empty string.
const generateAbout = aboutText => {
    if (!aboutText) {
        return '';
    }
    
    return `
    <section class="my-3" id="about">
        <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
        <p>${aboutText}</p>
    </section>
    `;
};

const generateProjects = projectsArr => {
//Refactured code for code below this, HUGE CHANGE from original
    return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
      ${projectsArr
        .filter(({ feature }) => feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 mb-2 bg-dark text-light p-3">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.map(language => language).join(',')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}

      ${projectsArr
        .filter(({ feature }) => !feature)
        .map(({ name, description, languages, link }) => {
          return `
          <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
            <h3 class="portfolio-item-title text-light">${name}</h3>
            <h5 class="portfolio-languages">
              Built With:
              ${languages.join(', ')}
            </h5>
            <p>${description}</p>
            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
          </div>
        `;
        })
        .join('')}
      </div>
    </section>
  `;
};
    // //get array of just featured projects
    // const featuredProjects = projectsArr.filter(project => {
    //     if (project.feature) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });
    // //get array of all non-featured projects
    // const nonFeaturedProjects = projectsArr.filter(project => {
    //     if (!project.feature) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });

    // const featuredProjectHtmlArr = featuredProjects.map(({name,description,languages, link}) => {
    //     return `
    //     <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
    //       <h3 class="portfolio-item-title text-light">${name}</h3>
    //       <h5 class="portfolio-languages">
    //         Built With:
    //         ${languages.join(', ')}
    //       </h5>
    //       <p>${description}</p>
    //       <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
    //     </div>
    //   `;
    // })

    // const nonFeaturedProjectHtmlArr = nonFeaturedProjects.map(({name,description,languages, link}) => {
    //     return `
    //     <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
    //       <h3 class="portfolio-item-title text-light">${name}</h3>
    //       <h5 class="portfolio-languages">
    //         Built With:
    //         ${languages.join(', ')}
    //       </h5>
    //       <p>${description}</p>
    //       <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
    //     </div>
    //   `;
    // })
//Using the .filter() array method, we created two new arrays of project data based on whether their feature property was true or false. 
//Once we separated the array data, we created two sets of HTML data and got them into the <section> element.

//     return `
//     <section class="my-3" id="portfolio">
//       <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
//       <div class="flex-row justify-space-between">
//         ${featuredProjectHtmlArr.join('')}
//         ${nonFeaturedProjectHtmlArr.join('')}
//       </div>
//     </section>
//   `;
// }
//So we've just updated the generateProjects() function to do two tasks. First, we take the array of project data and we create a new array from it, called projectHtmlArr. 
//Then we take that array and interpolate it into the returning project <section> element template literal. 
//We use a .join() method to turn the projectHtmlArr into a combined string of HTML before returning as well.

module.exports = templateData => {
    console.log(templateData)
    //destructure projects and about data fromtemplateData bosed on their property key names
    //This will create three variables based on data in templateData
    //destructure page data by section
    const {projects, about, ...header} = templateData;
    //could have also possibly done this but not as eficient
    //const header = {
  //name: templateData.name,
  //github: templateData.github
//};
    return `
    <!DOCTYPE html> 
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
    </head>
  
    <body>
      <header>
        <div class = "container flex-row justify-space-between align-center py-3">
          <h1 class = "page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
          <nav class = "flex-row">
           <a class = "ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${header.github}">Github</a>
          </nav>
        </div>
      </header>

      <main class = "container my-5">
        ${generateAbout(about)}
        ${generateProjects(projects)}
      </main>

      <footer class = "container text-center py-3">
        <h3 class = "text-dark">&copy: ${new Date().getFullYear()} by ${header.name}</h3>
      </footer>
    </body>
    </html>
    `;
};

//You might have also noticed that you executed a function (generateAbout) from a template literal! 
//This has become common when working with template literals, 
//as you can now separate pieces of the UI into multiple functions and think about them in abstraction
