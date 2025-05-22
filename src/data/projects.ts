export interface Project {
  tags: string[];
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: string;
  image?: string;
  thumbnail?: string;
  video?: string;
  unityBuild?: string;
  link?: string;
  itchEmbed?: string;
}

// Helper function to get project image paths
export const getProjectImages = (projectId: string) => {
  const getImagePath = (name: string) => {
    return `/projects/${projectId}/${name}`;
  };

  return {
    image: getImagePath('main.png'),
    thumbnail: getImagePath('thumbnail.png'),
    video: `/projects/${projectId}/video.mp4`,
  };
};

export const projects: Project[] = [
  {
    title: 'Odyssey',
    tags: ['Game Development', 'Adventure', '2023'],
    id: 'odyssey',
    shortDescription: 'An immersive adventure game set in a futuristic world.',
    fullDescription: 'Odyssey 2023 is an immersive adventure game that takes players on a journey through a beautifully crafted futuristic world. With stunning visuals and engaging gameplay mechanics, players must navigate through various challenges while uncovering the mysteries of this unique universe.',
    year: '2023',
    ...getProjectImages('odyssey'),
    link: 'https://spikar1.itch.io/odyssey',
    itchEmbed: '<iframe frameborder="0" src="https://itch.io/embed/1477675?bg_color=455c7b&amp;fg_color=ffffff&amp;link_color=da727e&amp;border_color=687190" width="552" height="167"><a href="https://spikar1.itch.io/odd-odyssey">Odd Odyssey by spikar1</a></iframe>',

  },
  {
    title: 'Odd Odyssey',
    id: 'odd-odyssey',
    tags: ['Game Development', 'Puzzle', '2023'],
    shortDescription: 'A quirky puzzle-platformer with unique mechanics.',
    fullDescription: 'Odd Odyssey is a charming puzzle-platformer that combines classic platforming elements with innovative puzzle mechanics. Players control a unique character with special abilities, solving puzzles and overcoming obstacles in a world filled with surprises and challenges.',
    year: '2023',
    ...getProjectImages('odd-odyssey'),
    itchEmbed: '<iframe frameborder="0" src="https://itch.io/embed/1379102?bg_color=455c7b&amp;fg_color=ffffff&amp;link_color=da727e&amp;border_color=687190" width="552" height="167"><a href="https://spikar1.itch.io/odd-odyssey">Odd Odyssey by spikar1</a></iframe>',
  },
  {
    title: 'Steffen Furelis Pattern Puzzle',
    tags: ['Game Development', 'Puzzle', '2023'],
    id: 'pattern-puzzle',
    year: '2023',
    shortDescription: 'A pattern-matching puzzle game built on the foundation of Gas Control Repair.',
    fullDescription: `Steffen Fureli's Pattern Puzzle is a game that is built on the foundation of Gas Control Repair.


After gaining funding from Viken Filminstitutt the game has been remade from the ground up, adding new mechanics and graphics.`,
    unityBuild: '/unity-builds/pattern-puzzle',
    itchEmbed: '<iframe frameborder="0" src="https://itch.io/embed/1723876?bg_color=9196c0&amp;fg_color=222222&amp;link_color=faf98b&amp;border_color=4e5159" width="552" height="167"><a href="https://spikar1.itch.io/gate-pattern-puzzle">Steffen Fureli\'s Pattern Puzzle by spikar1</a></iframe>',
    ...getProjectImages('pattern-puzzle'),
  },
  {
    title: 'Forest Spirits',
    tags: ['Game Development', 'Mobile', '2023', 'Puzzle'],
    id: 'forest-spirits',
    year: '2023',
    shortDescription: 'A modern take on the classic Color Lines game with new mechanics and scoring system.',
    fullDescription: `Forest Spirits is a game made by and published by myself with the help of a small team of four people. The game is simple at its core, and heavily based on the old classic Color Lines.

Rather than a cold copy, our version introduces new levels, new mechanics, and a new scoring system.`,
    link: 'https://play.google.com/store/apps/details?id=com.fureli.forestspirits',
    ...getProjectImages('forest-spirits'),
  },
  {
    title: 'Gas Control Repair',
    tags: ['Game Development', 'Game Jam', '2020', 'Puzzle'],
    id: 'gas-control-repair',
    year: '2020',
    shortDescription: 'A Global Game Jam project about repairing gas control systems through pattern matching.',
    fullDescription: `Gas Control Repair was developed during the Bergen Game Jam 2020 as part of the Global Game Jam event. Working with a team of six developers, we embraced the theme "Repair" to create an engaging puzzle game.

As the project lead and primary programmer, I guided the team through rapid prototyping and iterative design. The game mechanics evolved through extensive playtesting and paper prototyping sessions, resulting in a refined and intuitive gameplay experience.

In Gas Control Repair, players must master a unique control scheme:
• Use WASD keys to control the crane
• Use arrow keys to navigate the map
The objective is to repair gas control systems by matching patterns on the left side while navigating through nodes on the right side of the screen.`,
    link: 'https://globalgamejam.org/2020/games/gas-control-repair-9',
    ...getProjectImages('gas-control-repair'),
  },
  {
    title: 'Knightball',
    tags: ['Game Development', 'Sports', '2020'],
    id: 'knightball',
    year: '2020',
    shortDescription: 'A medieval sports game where players ram each other into a dragon\'s mouth.',
    fullDescription: `This game was made during the Norwegian NM i Gameplay, a competition run very much like a three day-game jam, but with money prices and judges. We were a group of six people.

In this game I was project lead and lead designer. I did all implementation of graphics and all graphical coding.

Knightball is about a sport in which there is no ball, only players. The goal of the game is to ram the other players into the mouth of the dragon, which in turn scores a goal. The team to lose all players first loses.`,
    link: 'https://globalgamejam.org/2020/games/knightball',
    ...getProjectImages('knightball'),
  },
  {
    title: 'Cybility',
    tags: ['Game Development', 'Game Jam', '2018', 'Retro'],
    id: 'cybility',
    year: '2018',
    shortDescription: 'A retro-style game where players can steal abilities from each other.',
    fullDescription: `This was a Global Game Jam game made at Bergen Game Jam 2018.
We were a group of four people in a pre-assigned group to make a game in 48 hours. The theme for the Jam was "Transmission", And our take on the theme was to "steal" abilities from a coop player.

Our artist is a beast in Pixel Art, so our graphical style leaned towards retro style textures. We however decided to merge the pixelated snes-style graphics with 3D to create a slightly more unique game.

In retrospect the design didn't work as well as we hoped, but the game do look stunning!

In this project my role was a Game Designer and Technical Artist. I did all graphical implementations and visual effects.`,
    link: 'https://globalgamejam.org/2018/games/cybility',
    ...getProjectImages('cybility'),
  },
  {
    title: 'Rocket Billies',
    tags: ['Game Development', 'Action', '2018', 'Multiplayer'],
    id: 'rocket-billies',
    year: '2018',
    shortDescription: 'A four-player game where two players must cooperate to drive one vehicle.',
    fullDescription: `This game was made during the Norwegian NM i Gameplay 2018, a competition run very much like a two week-game jam, but with money prices and judges. We were a group of seven people.

In this game I was gameplay programmer. I also did all implementation of graphics and all graphical coding.

Rocket Billies is a game about destroying you opponents vehicle with attached guns!
The catch? there are two drivers per vehicle!
In this four player game two players must cooperate to drive one vehicle, controlling a half of the vehicle each.`,
    link: 'https://globalgamejam.org/2018/games/rocket-billies',
    ...getProjectImages('rocket-billies'),
  },
  {
    title: 'Cascade',
    tags: ['Game Development', 'Game Jam', '2017'],
    id: 'cascade',
    year: '2017',
    shortDescription: 'A wave-based game created during Global Game Jam 2017.',
    fullDescription: `This was a Global Game Jam game made at Bergen Game Jam.
We were a group of five people that was placed in a random group to make a game in 48 hours. The theme for the Jam was "Wave", and that was the basis for the visual style we implemented.

I was in charge of gameplay design and programming, plus I did all visual implementations and effects.`,
    link: 'https://globalgamejam.org/2017/games/cascade',
    ...getProjectImages('cascade'),
  },
  {
    title: 'That Pariah Game',
    tags: ['Game Development', '2D', '2015', 'Shooter'],
    id: 'that-pariah-game',
    year: '2015',
    shortDescription: 'A 2D physics-based shooter inspired by Super Crate Box and Metroidvania games.',
    fullDescription: `A 2D shooter relying heavily on physics.

This was a project I did with a classmate second year at Noroff in Bergen, Norway.

We were big fans of the game "Super Crate Box" at the time, and had always wanted to create a Metroidvania game, so we thought we'd just combine the two. In one of out first meeting we got the idea of a gun with such a high recoil, that it would allow the character to stay afloat for several seconds, which is the feature most prominent in the end result.

Technique wise, we decieded to play on one of our weaknesses, being that we did not have an artist on the team. The lack of an artist made us want to create a "textureless" design, where nothing had texture applied. This is ofcourse only half true, as we faked alot of shadows and AO using baked textures.

but the vision remained.`,
    ...getProjectImages('that-pariah-game'),
  },
  {
    id: 'landscape-generator',
    title: 'Landscape Generator/Editor',
    year: '2015',
    shortDescription: 'A procedural level design tool using Houdini and Houdini Engine for Unity.',
    fullDescription: `A procedural approach to creative freedom in level design.

Final Year Project at Teesside University.

The goal was to create a tool using Houdini and Houdini Engine for Unity in which it was possible to create a fulle fledged level from start to finish directly in the Unity game engine.`,
    tags: ['Tool Development', 'Procedural Generation', '2015', 'Unity'],
    link: 'https://steffenfureli.wordpress.com/',
    ...getProjectImages('landscape-generator'),
  },
  {
    title: 'Ibrahim Sands',
    tags: ['Level Design', 'UDK', '2014'],
    id: 'ibrahim-sands',
    year: '2014',
    shortDescription: 'A level designed and created in UDK for a 9-week project at Noroff Bergen.',
    fullDescription: `Ibrahim Sands is a level I designed and made in UDK for our 9-week project at Noroff Bergen.`,
    ...getProjectImages('ibrahim-sands'),
  },
  {
    title: 'The Rafinery',
    tags: ['Level Design', 'UDK', '2014', 'Survival'],
    id: 'the-rafinery',
    year: '2014',
    shortDescription: 'A factory-themed survival game level created in UDK.',
    fullDescription: `"The Refinery" is a gamelevel I made for an assignement at Noroff.
We were to design the layout of the level, build it with bsp-brushes first and then set-dress it afterwards, using only the included assets from the udk-engine. Afterwards we also had the task in utilizing kismet to make a survival game.

I made the level considering the assets in udk, and knew that a factory like level would grant me the most fitting assets to work with.

I designed the layout considering the survival mode of gameplay, and tried to make each playthrough seem a bit different, pushing the player towards trying the level again, and again.

This is, hopefully, achieved by how the level opens up more and more when you reach higher waves, in the end you even get to go out and play on what seemed to be only the backround at first.

After a lot of testing with the bsp-brushes in udk, I used the udk-assets and set dressed the level in finer details.`,
    ...getProjectImages('the-rafinery'),
  }
]; 