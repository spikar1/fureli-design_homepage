export interface ProjectVideo {
  src: string;
  poster?: string;
}

export type ProjectType = 'Game' | 'Level' | 'Configurator' | 'Editor';

export type ProjectContext = 'Commercial' | 'Indie' | 'Game jam' | 'Competition' | 'Student';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  year: string;
  image: string;
  thumbnail: string;
  /** Landscape image for the large featured card. Defaults to `image`. */
  cover?: string;
  videos?: ProjectVideo[];
  unityBuild?: string;
  unityVersion?: '5' | 'new';
  link?: string;
  itchEmbed?: string;
  /** What kind of project this was. Shown in the overline: `year · context`. */
  context: ProjectContext;
  /** What the project is. Shown as the first chip. */
  type: ProjectType;
  /** e.g. 'Unity', 'Unity + Needle Engine'. Shown as a chip. */
  engine?: string;
  /** e.g. 'Steam', 'iOS', 'Android', 'Web', 'PC'. Shown as chips. */
  platforms?: string[];
  /** Steffen's role. Shown on the project page only. */
  role?: string;
  /** e.g. 'Team of 6', 'Solo'. Shown on the project page only. */
  team?: string;
  /** 1–4: position in the featured section on the homepage. */
  featured?: number;
}

// Helper function to get project image paths
export const getProjectImages = (projectId: string) => {
  const getImagePath = (name: string) => {
    return `/projects/${projectId}/${name}`;
  };

  return {
    image: getImagePath('main.png'),
    thumbnail: getImagePath('thumbnail.png'),
  };
};

export const projects: Project[] = [
    
  {
    title: 'Fruitbus',
    id: 'fruitbus',
    type: 'Game',
    context: 'Commercial', engine: 'Unity', platforms: ['Steam'], featured: 1,
    year: '2024',
    shortDescription: 'Fruitbus is a cute culinary adventure, set in an open world where taste is everything.',
    fullDescription: `Fruitbus is a cute culinary adventure, set in an open world where taste is everything. Upgrade your trusty truck and visit a whole world of new destinations together. 
    
    Discover fresh fruits and vegetables on each island of the Gustum archipelago, learn their customs and cook meals that will make someone’s day.`,
    link: 'https://www.krillbite.com/fruitbus',
    ...getProjectImages('fruitbus'),
    videos: [{ src: '/projects/fruitbus/video.mp4', poster: '/projects/fruitbus/video-poster.jpg' }],
  },
  { 
    title: 'Bukkene Bruse til Bjørneparken',
    id: 'bukkene-bruse-til-bjorneparken',
    type: 'Game',
    context: 'Commercial', engine: 'Unity', platforms: ['iOS', 'Android'], featured: 2,
    cover: '/projects/bukkene-bruse-til-bjorneparken/thumbnail.png', // main.png is portrait
    year: '2024',
    shortDescription: 'In the Bukkene Bruse game, you have to drive the guests to the Bear Park without being caught by the troll.',
    fullDescription: 'Bukkene Bruse til Bjørneparken is a game about driving guests to the Bear Park without being caught by the troll.',
    ...getProjectImages('bukkene-bruse-til-bjorneparken'),
    link: 'https://bjorneparken.no/bukkene-bruse/',
    videos: [{ src: '/projects/bukkene-bruse-til-bjorneparken/video.mp4', poster: '/projects/bukkene-bruse-til-bjorneparken/video-poster.jpg' }],
  },
  {
    title: 'Nordpeis Configurator',
    id: 'nordpeis-configurator',
    type: 'Configurator',
    context: 'Commercial', engine: 'Unity + Needle Engine', platforms: ['Web'],
    year: '2024',
    shortDescription: 'Nordpeis Configurator is a WebGL tool for configuring fireplaces.',
    fullDescription: `Nordpeis Configurator is a WebGL tool for configuring fireplaces.

    It is built using the Needle-Engine, a modern WebGL engine for building 3D apps.`,
    link: 'https://configurator.nordpeis.com/en',
    ...getProjectImages('nordpeis-configurator'),
  },
  {
    title: 'Gårdsdetektivene',
    id: 'gardsdetektivene',
    type: 'Game',
    context: 'Commercial', engine: 'Unity',
    year: '2024',
    shortDescription: 'Gårdsdetektivene is a collection of minigames for kids.',
    fullDescription: `Gårdsdetektivene is a collection of minigames for kids.

    It is built using the Unity game engine.`,
    ...getProjectImages('gardsdetektivene'),
    link: 'https://www.dyreparken.no/kutoppen/spill-gardsdetektivene-pa-kutoppen/',
  },
  {
    title: 'Odyssey',
    id: 'odyssey',
    type: 'Game',
    context: 'Indie', // TODO(interview): confirm context
    shortDescription: 'An immersive adventure game set in a futuristic world.',
    fullDescription: 'Odyssey 2023 is an immersive adventure game that takes players on a journey through a beautifully crafted futuristic world. With stunning visuals and engaging gameplay mechanics, players must navigate through various challenges while uncovering the mysteries of this unique universe.',
    year: '2023',
    ...getProjectImages('odyssey'),
    link: 'https://spikar1.itch.io/odyssey',
    videos: [
      { src: '/projects/odyssey/video.mp4', poster: '/projects/odyssey/video-poster.jpg' },
      { src: '/projects/odyssey/video-2.mp4', poster: '/projects/odyssey/video-2-poster.jpg' },
    ],
    itchEmbed: '<iframe frameborder="0" src="https://itch.io/embed/1477675?bg_color=455c7b&amp;fg_color=ffffff&amp;link_color=da727e&amp;border_color=687190" width="552" height="167"><a href="https://spikar1.itch.io/odd-odyssey">Odd Odyssey by spikar1</a></iframe>',

  },
  {
    title: 'Odd Odyssey',
    id: 'odd-odyssey',
    type: 'Game',
    context: 'Indie', // TODO(interview): confirm context
    shortDescription: 'A quirky puzzle-platformer with unique mechanics.',
    fullDescription: 'Odd Odyssey is a charming puzzle-platformer that combines classic platforming elements with innovative puzzle mechanics. Players control a unique character with special abilities, solving puzzles and overcoming obstacles in a world filled with surprises and challenges.',
    year: '2023',
    ...getProjectImages('odd-odyssey'),
    itchEmbed: '<iframe frameborder="0" src="https://itch.io/embed/1379102?bg_color=455c7b&amp;fg_color=ffffff&amp;link_color=da727e&amp;border_color=687190" width="552" height="167"><a href="https://spikar1.itch.io/odd-odyssey">Odd Odyssey by spikar1</a></iframe>',
  },
  {
    title: "Steffen Fureli's Pattern Puzzle",
    id: 'pattern-puzzle',
    type: 'Game',
    context: 'Indie', engine: 'Unity', platforms: ['Web'], featured: 3,
    year: '2023',
    shortDescription: 'A pattern-matching puzzle game built on the foundation of Gas Control Repair.',
    fullDescription: `Steffen Fureli's Pattern Puzzle is a game that is built on the foundation of Gas Control Repair.


After gaining funding from Viken Filminstitutt the game has been remade from the ground up, adding new mechanics and graphics.`,
    unityBuild: '/unity-builds/pattern-puzzle',
    itchEmbed: '<iframe frameborder="0" src="https://itch.io/embed/1723876?bg_color=9196c0&amp;fg_color=222222&amp;link_color=faf98b&amp;border_color=4e5159" width="552" height="167"><a href="https://spikar1.itch.io/gate-pattern-puzzle">Steffen Fureli\'s Pattern Puzzle by spikar1</a></iframe>',
    ...getProjectImages('pattern-puzzle'),
    videos: [{ src: '/projects/pattern-puzzle/video.mp4', poster: '/projects/pattern-puzzle/video-poster.jpg' }],
  },
  {
    title: 'Forest Spirits',
    id: 'forest-spirits',
    type: 'Game',
    context: 'Indie', platforms: ['Android'], role: 'Developer & publisher', team: 'Team of 4',
    year: '2023',
    shortDescription: 'A modern take on the classic Color Lines game with new mechanics and scoring system.',
    fullDescription: `Forest Spirits is a game made by and published by myself with the help of a small team of four people. The game is simple at its core, and heavily based on the old classic Color Lines.

Rather than a cold copy, our version introduces new levels, new mechanics, and a new scoring system.`,
    link: 'https://play.google.com/store/apps/details?id=com.FureliDesign.LilSprouts&hl=en',
    ...getProjectImages('forest-spirits'),
  },
  {
    title: 'Gas Control Repair',
    id: 'gas-control-repair',
    type: 'Game',
    context: 'Game jam', role: 'Project lead & primary programmer', team: 'Team of 6',
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
    id: 'knightball',
    type: 'Game',
    context: 'Competition', role: 'Project lead & lead designer, all graphics implementation', team: 'Team of 6', featured: 4,
    year: '2020',
    shortDescription: 'A medieval sports game where players ram each other into a dragon\'s mouth.',
    fullDescription: `This game was made during the Norwegian NM i Gameplay, a competition run very much like a three-day game jam, but with prize money and judges. We were a group of six people.

In this game I was project lead and lead designer. I did all implementation of graphics and all graphical coding.

Knightball is about a sport in which there is no ball, only players. The goal of the game is to ram the other players into the mouth of the dragon, which in turn scores a goal. The team to lose all players first loses.`,
    link: 'https://globalgamejam.org/2020/games/knightball',
    ...getProjectImages('knightball'),
    videos: [{ src: '/projects/knightball/video.mp4', poster: '/projects/knightball/video-poster.jpg' }],
  },
  {
    title: 'Cybility',
    id: 'cybility',
    type: 'Game',
    context: 'Game jam', role: 'Game designer & technical artist', team: 'Team of 4',
    year: '2018',
    shortDescription: 'A retro-style game where players can steal abilities from each other.',
    fullDescription: `This was a Global Game Jam game made at Bergen Game Jam 2018.
We were a group of four people in a pre-assigned group to make a game in 48 hours. The theme for the Jam was "Transmission", and our take on the theme was to "steal" abilities from a coop player.

Our artist is a beast in Pixel Art, so our graphical style leaned towards retro style textures. We however decided to merge the pixelated snes-style graphics with 3D to create a slightly more unique game.

In retrospect the design didn't work as well as we hoped, but the game does look stunning!

In this project my role was a Game Designer and Technical Artist. I did all graphical implementations and visual effects.`,
    link: 'https://globalgamejam.org/2018/games/cybility',
    ...getProjectImages('cybility'),
  },
  {
    title: 'Rocket Billies',
    id: 'rocket-billies',
    type: 'Game',
    context: 'Competition', role: 'Gameplay programmer, graphics implementation', team: 'Team of 7',
    year: '2018',
    shortDescription: 'A four-player game where two players must cooperate to drive one vehicle.',
    fullDescription: `This game was made during the Norwegian NM i Gameplay 2018, a competition run very much like a two-week game jam, but with prize money and judges. We were a group of seven people.

In this game I was gameplay programmer. I also did all implementation of graphics and all graphical coding.

Rocket Billies is a game about destroying your opponents vehicle with attached guns!
The catch? There are two drivers per vehicle!
In this four player game two players must cooperate to drive one vehicle, controlling a half of the vehicle each.`,
    link: 'https://globalgamejam.org/2018/games/rocket-billies',
    ...getProjectImages('rocket-billies'),
  },
  {
    title: 'Cascade',
    id: 'cascade',
    type: 'Game',
    context: 'Game jam', engine: 'Unity', platforms: ['Web'], role: 'Gameplay design & programming, visuals', team: 'Team of 5',
    year: '2017',
    shortDescription: 'A wave-based game created during Global Game Jam 2017.',
    fullDescription: `This was a Global Game Jam game made at Bergen Game Jam.
We were a group of five people that was placed in a random group to make a game in 48 hours. The theme for the Jam was "Wave", and that was the basis for the visual style we implemented.

I was in charge of gameplay design and programming, plus I did all visual implementations and effects.`,
    link: 'https://globalgamejam.org/2017/games/cascade',
    unityBuild: '/unity-builds/cascade',
    unityVersion: '5',
    ...getProjectImages('cascade'),
  },
  {
    title: 'That Pariah Game',
    id: 'that-pariah-game',
    type: 'Game',
    context: 'Student', team: 'Team of 2',
    year: '2015',
    shortDescription: 'A 2D physics-based shooter inspired by Super Crate Box and Metroidvania games.',
    fullDescription: `A 2D shooter relying heavily on physics.

This was a project I did with a classmate second year at Noroff in Bergen, Norway.

We were big fans of the game "Super Crate Box" at the time, and had always wanted to create a Metroidvania game, so we thought we'd just combine the two. In one of our first meetings we got the idea of a gun with such a high recoil, that it would allow the character to stay afloat for several seconds, which is the feature most prominent in the end result.

Technique wise, we decided to play on one of our weaknesses, being that we did not have an artist on the team. The lack of an artist made us want to create a "textureless" design, where nothing had texture applied. This is of course only half true, as we faked a lot of shadows and AO using baked textures.

But the vision remained.`,
    ...getProjectImages('that-pariah-game'),
  },
  {
    id: 'landscape-generator',
    type: 'Editor',
    context: 'Student', engine: 'Unity + Houdini Engine', team: 'Solo (final-year project)',
    title: 'Landscape Generator/Editor',
    year: '2015',
    shortDescription: 'A procedural level design tool using Houdini and Houdini Engine for Unity.',
    fullDescription: `A procedural approach to creative freedom in level design.

Final Year Project at Teesside University.

The goal was to create a tool using Houdini and Houdini Engine for Unity in which it was possible to create a full-fledged level from start to finish directly in the Unity game engine.`,
    link: 'https://steffenfureli.wordpress.com/',
    ...getProjectImages('landscape-generator'),
  },
  {
    title: 'Ibrahim Sands',
    id: 'ibrahim-sands',
    type: 'Level',
    context: 'Student', engine: 'UDK', role: 'Level designer', team: 'Solo',
    year: '2014',
    shortDescription: 'A level designed and created in UDK for a 9-week project at Noroff Bergen.',
    fullDescription: `Ibrahim Sands is a level I designed and made in UDK for our 9-week project at Noroff Bergen.`,
    ...getProjectImages('ibrahim-sands'),
  },
  {
    title: 'The Refinery',
    id: 'the-rafinery',
    type: 'Level',
    context: 'Student', engine: 'UDK', role: 'Level designer', team: 'Solo',
    year: '2014',
    shortDescription: 'A factory-themed survival game level created in UDK.',
    fullDescription: `"The Refinery" is a game level I made for an assignment at Noroff.
We were to design the layout of the level, build it with bsp-brushes first and then set-dress it afterwards, using only the included assets from the udk-engine. Afterwards we also had the task in utilizing kismet to make a survival game.

I made the level considering the assets in udk, and knew that a factory like level would grant me the most fitting assets to work with.

I designed the layout considering the survival mode of gameplay, and tried to make each playthrough seem a bit different, pushing the player towards trying the level again, and again.

This is, hopefully, achieved by how the level opens up more and more when you reach higher waves, in the end you even get to go out and play on what seemed to be only the background at first.

After a lot of testing with the bsp-brushes in udk, I used the udk-assets and set dressed the level in finer details.`,
    ...getProjectImages('the-rafinery'),
  }
]; 

const byYearDesc = (a: Project, b: Project) => Number(b.year) - Number(a.year);

/** Featured projects in their `featured` order. */
export const featuredProjects: Project[] = projects
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

/** Everything that is not featured, newest first (list order kept within a year). */
export const moreProjects: Project[] = projects
  .filter((p) => p.featured === undefined)
  .sort(byYearDesc);

/** Featured first, then the rest. Used by the homepage and for previous/next navigation. */
export const orderedProjects: Project[] = [...featuredProjects, ...moreProjects];

export const getProject = (id: string) => projects.find((p) => p.id === id);

/** Previous and next project in `orderedProjects`, wrapping around. */
export const getAdjacentProjects = (id: string) => {
  const i = orderedProjects.findIndex((p) => p.id === id);
  const n = orderedProjects.length;
  return {
    previous: orderedProjects[(i - 1 + n) % n],
    next: orderedProjects[(i + 1) % n],
  };
};

/** Tech chips shown after the type chip: engine, then platforms. */
export const getProjectChips = (project: Project): string[] => [
  ...(project.engine ? [project.engine] : []),
  ...(project.platforms ?? []),
];

/** Button label for a project's external link, based on its domain. */
export const getLinkLabel = (url: string): string => {
  let host = '';
  try {
    host = new URL(url).hostname;
  } catch {
    return 'Official website';
  }
  if (host.endsWith('itch.io')) return 'Play on itch.io';
  if (host === 'play.google.com') return 'Get it on Google Play';
  if (host.endsWith('globalgamejam.org')) return 'Global Game Jam page';
  if (host.endsWith('wordpress.com')) return 'Read the blog';
  return 'Official website';
};
