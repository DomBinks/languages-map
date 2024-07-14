# Languages Map

### Languages Map is an interactive tool that visualises where different languages are spoken around the world.

- The tool allows you to select a range of different languages, and highlights the countries that speak those languages on the map in different colours.
- Developed with Angular(TypeScript), Bootstrap, HTML, and CSS.
- Check it out [here](https://dombinks.github.io/languages-map).

## FAQ:
### Why did you create this tool?

I've always been interested in languages, and how different languages have spread to different parts of the world. I wanted to create a way to see this information and interact with it.

### Why isn't a certain country or territory highlighted when selecting a specific language?

The data for the place isn't available from the API I'm using,
or wasn't on the list of places that speak the language I used.
Generally, I've only included countries where the language is an official language. 

### Why isn't a certain language available?

There are thousands of languages spoken around the world, so I've decided to only add a select few.
In the future, I may decide to add other languages.

### Why does it take so long to load?

A large amount of data has to be fetched to create the overlays, so can take some time to download.
