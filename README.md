Usage
To run this app, clone this repository and run the following commands:

npm install

npm start

####

TEST
Using React-testing library
command: npm run test

test cases:

- Homepage

  - search by name and check result
  - search by name and check error

- PokemonDetail

  - check render correct data
  - check error

- Technical decision
  I tried to use api to get pokemons with smiliar names but it looks like they don't support that. so I tried to use api to get all pokemons and filter by searchvalue.
