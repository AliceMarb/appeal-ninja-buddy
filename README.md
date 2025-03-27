<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://appeal-ninja-buddy.vercel.app/">
    <img src="https://appeal-ninja-buddy.vercel.app/appeal_buddy.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ClaimBuddy</h3>

  <p align="center">
    A powerful tool to help generate and manage insurance claim appeals!
    <br />
    <a href="https://github.com/AliceMarb/appeal-ninja-buddy"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://appeal-ninja-buddy.vercel.app/">View Demo</a>
    &middot;
    <a href="https://github.com/AliceMarb/appeal-ninja-buddy/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/AliceMarb/appeal-ninja-buddy/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://appeal-ninja-buddy.vercel.app/)

ClaimBuddy is a powerful tool designed to help users generate, manage, and optimize insurance claim appeals. It provides a streamlined workflow for creating effective appeals against denial decisions.

This repository contains the frontend component of ClaimBuddy. The application connects to a separate backend component that utilizes A21Lab's maestro agent orchestrator for processing appeals.

Key features:
* Intuitive, step-by-step appeal creation process
* Policy document analysis
* Smart suggestions based on insurance guidelines
* Personalized appeal letter generation
* Easy management of appeal cases
* Professional formatting and output

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This project is built with modern web technologies for optimal performance and user experience:

* [![React][React.js]][React-url]
* [![TypeScript][TypeScript.com]][TypeScript-url]
* [![Vite][Vite.dev]][Vite-url]
* [![Tailwind][TailwindCSS.com]][Tailwind-url]
* [![Shadcn][Shadcn-ui.com]][Shadcn-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

This project requires Node.js and npm.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/AliceMarb/appeal-ninja-buddy.git
   ```
2. Navigate to the project directory
   ```sh
   cd appeal-ninja-buddy
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Change git remote URL to avoid accidental pushes to base project
   ```sh
   git remote set-url origin <your-username>/appeal-ninja-buddy
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

ClaimBuddy provides a user-friendly step-by-step interface for creating insurance claim appeals:

1. Upload your insurance policy document for analysis
2. Enter details about the insurance denial you're appealing
3. Provide relevant medical information and supporting documentation
4. Review and generate your personalized appeal letter

The app leverages A21Lab's maestro agent orchestrator on the backend to analyze your policy documents, identify appeal opportunities, and craft a personalized appeal letter that addresses the specific reasons for the denial, with references to relevant policy sections and medical necessity criteria.

_For more examples, please refer to the [Documentation](https://github.com/AliceMarb/appeal-ninja-buddy) or visit the [live site](https://appeal-ninja-buddy.vercel.app/)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Enhanced policy document analysis
- [ ] Appeal tracking system
- [ ] Multiple appeal templates for different insurance types
- [ ] AI-powered appeal optimization with success rate predictions
- [ ] Integration with electronic medical record systems
- [ ] Multi-language Support
    - [ ] Spanish
    - [ ] French

See the [open issues](https://github.com/AliceMarb/appeal-ninja-buddy/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/AliceMarb/appeal-ninja-buddy](https://github.com/AliceMarb/appeal-ninja-buddy)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [Img Shields](https://shields.io)
* [React Icons](https://react-icons.github.io/react-icons/search)
* [Lovable](https://lovable.dev/projects/157e7795-da74-4ed4-a006-b8d27ae156f4)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/AliceMarb/appeal-ninja-buddy.svg?style=for-the-badge
[contributors-url]: https://github.com/AliceMarb/appeal-ninja-buddy/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AliceMarb/appeal-ninja-buddy.svg?style=for-the-badge
[forks-url]: https://github.com/AliceMarb/appeal-ninja-buddy/network/members
[stars-shield]: https://img.shields.io/github/stars/AliceMarb/appeal-ninja-buddy.svg?style=for-the-badge
[stars-url]: https://github.com/AliceMarb/appeal-ninja-buddy/stargazers
[issues-shield]: https://img.shields.io/github/issues/AliceMarb/appeal-ninja-buddy.svg?style=for-the-badge
[issues-url]: https://github.com/AliceMarb/appeal-ninja-buddy/issues
[license-shield]: https://img.shields.io/github/license/AliceMarb/appeal-ninja-buddy.svg?style=for-the-badge
[license-url]: https://github.com/AliceMarb/appeal-ninja-buddy/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/
[product-screenshot]: https://appeal-ninja-buddy.vercel.app/appeal_buddy.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vite.dev]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TailwindCSS.com]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Shadcn-ui.com]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
