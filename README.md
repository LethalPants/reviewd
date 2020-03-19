
# Reviewd
Reviewd brings the top critics in gaming all in one place. It is a review aggregator for video games, collecting reviews from the top publications in gaming such as IGN, GameSpot, Polygon, and Eurogamer. 

[![MIT License][license-shield]][license-url] [![LinkedIn][linkedin-shield]][linkedin-url]


## About The Project

![Reviewd Screen Shot][product-screenshot]


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
```sh
npm install npm@latest -g
```

### Installation
 
1. Clone the repo

```sh
git clone https://github.com/LethalPants/reviewd.git
```

2. Install NPM packages

```sh
npm install
cd client
npm install
```

3. Add `.env` file

Add a `.env` file to the root directory to add environment variables.
To the `.env` file add the following
```
MONGODB_URI = <YOUR MONGODB URI>
JWT_SECRET = <YOUR SECRET KEY>
```

4. Run `npm run dev`

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser. Whenever you modify any of the source files inside the `/src` folder,
the module bundler ([Webpack](http://webpack.github.io/)) will recompile the app on the fly and refresh all the connected browsers.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.








[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/LethalPants/reviewd/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/hatim-murtuza-669072175/
[product-screenshot]: https://github.com/LethalPants/reviewd/blob/master/screenshot/Reviewd.png
