export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  fullDescription?: string;
  imageUrl?: string;
  unityBuild?: string;
  tags: string[];
  link?: string;
  role?: string;
  teamSize?: string;
  event?: string;
}

export const projects: Project[] = [
  {
    id: 'odyssey',
    title: 'Odyssey 2023',
    year: '2023',
    description: 'A puzzle game developed in Unity.',
    fullDescription: 'A challenging puzzle game where players navigate through intricate levels, solving puzzles and overcoming obstacles. Built with Unity, featuring modern graphics and intuitive controls.',
    tags: ['Game Development', 'Unity', 'Puzzle'],
    role: 'Lead Developer',
    teamSize: '3 people',
    unityBuild: '/unity-builds/odyssey'
  },
  {
    id: 'odd-odyssey',
    title: 'Odd Odyssey',
    year: '2023',
    description: 'A game jam project developed in Unity.',
    fullDescription: 'Created during a 48-hour game jam, Odd Odyssey is a unique platformer that challenges players to think outside the box. Features innovative mechanics and a distinctive art style.',
    tags: ['Game Development', 'Game Jam', 'Platformer'],
    role: 'Developer',
    teamSize: '2 people',
    event: 'Game Jam 2023',
    unityBuild: '/unity-builds/odd-odyssey'
  },
  {
    id: 'pattern-puzzle-2023',
    title: 'Steffen Furelis Pattern Puzzle',
    year: '2023',
    description: 'A pattern-matching puzzle game built on the foundation of Gas Control Repair.',
    fullDescription: `Steffen Fureli's Pattern Puzzle is a game that is built on the foundation of Gas Control Repair.


After gaining funding from Viken Filminstitutt the game has been remade from the ground up, adding new mechanics and graphics.`,
    tags: ['Game Development', 'Puzzle', '2023'],
    role: 'Lead Developer',
    unityBuild: '/unity-builds/pattern-puzzle'
  },
  {
    id: 'forest-spirits-2023',
    title: 'Forest Spirits',
    year: '2023',
    description: 'A modern take on the classic Color Lines game with new mechanics and scoring system.',
    fullDescription: `Forest Spirits is a game made by and published by myself with the help of a small team of four people. The game is simple at its core, and heavily based on the old classic Color Lines.

Rather than a cold copy, our version introduces new levels, new mechanics, and a new scoring system.`,
    tags: ['Game Development', 'Mobile', '2023', 'Puzzle'],
    teamSize: '4 people',
    link: 'https://play.google.com/store/apps/details?id=com.fureli.forestspirits'
  },
  {
    id: 'gas-control-repair-2020',
    title: 'Gas Control Repair',
    year: '2020',
    description: 'A Global Game Jam project about repairing gas control systems through pattern matching.',
    fullDescription: `This was a Global Game Jam game made at Bergen Game Jam 2020.
We were a group of six people that was placed in a random group to make a game in 48 hours. The theme for the Jam was "Repair".

In this project I did all programming, implementation and was group leader. The design evolved very much from iterations and playtesting by paper prototypes.

The goal of this game is to navigate through nodes on the map to the right, by building all patterns along a path on the left side. The game is played with both WASD and arrow keys for the crane and map controls, in that order.`,
    tags: ['Game Development', 'Game Jam', '2020', 'Puzzle'],
    role: 'Lead Developer & Group Leader',
    teamSize: '6 people',
    event: 'Global Game Jam 2020',
    link: 'https://globalgamejam.org/2020/games/gas-control-repair-9'
  },
  {
    id: 'knightball-2020',
    title: 'Knightball',
    year: '2020',
    description: 'A medieval sports game where players ram each other into a dragon\'s mouth.',
    fullDescription: `This game was made during the Norwegian NM i Gameplay, a competition run very much like a three day-game jam, but with money prices and judges. We were a group of six people.

In this game I was project lead and lead designer. I did all implementation of graphics and all graphical coding.

Knightball is about a sport in which there is no ball, only players. The goal of the game is to ram the other players into the mouth of the dragon, which in turn scores a goal. The team to lose all players first loses.`,
    tags: ['Game Development', 'Sports', '2020'],
    role: 'Project Lead & Lead Designer',
    teamSize: '6 people',
    event: 'Norwegian NM i Gameplay'
  },
  {
    id: 'cybility-2020',
    title: 'Cybility',
    year: '2018',
    description: 'A retro-style game where players can steal abilities from each other.',
    fullDescription: `This was a Global Game Jam game made at Bergen Game Jam 2018.
We were a group of four people in a pre-assigned group to make a game in 48 hours. The theme for the Jam was "Transmission", And our take on the theme was to "steal" abilities from a coop player.

Our artist is a beast in Pixel Art, so our graphical style leaned towards retro style textures. We however decided to merge the pixelated snes-style graphics with 3D to create a slightly more unique game.

In retrospect the design didn't work as well as we hoped, but the game do look stunning!

In this project my role was a Game Designer and Technical Artist. I did all graphical implementations and visual effects.`,
    tags: ['Game Development', 'Game Jam', '2018', 'Retro'],
    role: 'Game Designer & Technical Artist',
    teamSize: '4 people',
    event: 'Global Game Jam 2018',
    link: 'https://globalgamejam.org/2018/games/cybility'
  },
  {
    id: 'rocket-billies-2020',
    title: 'Rocket Billies',
    year: '2018',
    description: 'A four-player game where two players must cooperate to drive one vehicle.',
    fullDescription: `This game was made during the Norwegian NM i Gameplay 2018, a competition run very much like a two week-game jam, but with money prices and judges. We were a group of seven people.

In this game I was gameplay programmer. I also did all implementation of graphics and all graphical coding.

Rocket Billies is a game about destroying you opponents vehicle with attached guns!
The catch? there are two drivers per vehicle!
In this four player game two players must cooperate to drive one vehicle, controlling a half of the vehicle each.`,
    tags: ['Game Development', 'Action', '2018', 'Multiplayer'],
    role: 'Gameplay Programmer',
    teamSize: '7 people',
    event: 'Norwegian NM i Gameplay 2018'
  },
  {
    id: 'cascade-2017',
    title: 'Cascade',
    year: '2017',
    description: 'A wave-based game created during Global Game Jam 2017.',
    fullDescription: `This was a Global Game Jam game made at Bergen Game Jam.
We were a group of five people that was placed in a random group to make a game in 48 hours. The theme for the Jam was "Wave", and that was the basis for the visual style we implemented.

I was in charge of gameplay design and programming, plus I did all visual implementations and effects.`,
    tags: ['Game Development', 'Game Jam', '2017'],
    role: 'Gameplay Designer & Programmer',
    teamSize: '5 people',
    event: 'Global Game Jam 2017',
    link: 'https://globalgamejam.org/2017/games/cascade'
  },
  {
    id: 'that-pariah-game-2015',
    title: 'That Pariah Game',
    year: '2015',
    description: 'A 2D physics-based shooter inspired by Super Crate Box and Metroidvania games.',
    fullDescription: `A 2D shooter relying heavily on physics.

This was a project I did with a classmate second year at Noroff in Bergen, Norway.

We were big fans of the game "Super Crate Box" at the time, and had always wanted to create a Metroidvania game, so we thought we'd just combine the two. In one of out first meeting we got the idea of a gun with such a high recoil, that it would allow the character to stay afloat for several seconds, which is the feature most prominent in the end result.

Technique wise, we decieded to play on one of our weaknesses, being that we did not have an artist on the team. The lack of an artist made us want to create a "textureless" design, where nothing had texture applied. This is ofcourse only half true, as we faked alot of shadows and AO using baked textures.

but the vision remained.`,
    tags: ['Game Development', '2D', '2015', 'Shooter'],
    teamSize: '2 people',
    event: 'Noroff Bergen'
  },
  {
    id: 'landscape-generator-2015',
    title: 'Landscape Generator/Editor',
    year: '2015',
    description: 'A procedural level design tool using Houdini and Houdini Engine for Unity.',
    fullDescription: `A procedural approach to creative freedom in level design.

Final Year Project at Teesside University.

The goal was to create a tool using Houdini and Houdini Engine for Unity in which it was possible to create a fulle fledged level from start to finish directly in the Unity game engine.`,
    tags: ['Tool Development', 'Procedural Generation', '2015', 'Unity'],
    role: 'Developer',
    event: 'Teesside University',
    link: 'https://steffenfureli.wordpress.com/'
  },
  {
    id: 'ibrahim-sands-2014',
    title: 'Ibrahim Sands',
    year: '2014',
    description: 'A level designed and created in UDK for a 9-week project at Noroff Bergen.',
    fullDescription: `Ibrahim Sands is a level I designed and made in UDK for our 9-week project at Noroff Bergen.`,
    tags: ['Level Design', 'UDK', '2014'],
    role: 'Level Designer',
    event: 'Noroff Bergen'
  },
  {
    id: 'the-rafinery-2014',
    title: 'The Rafinery',
    year: '2014',
    description: 'A factory-themed survival game level created in UDK.',
    fullDescription: `"The Refinery" is a gamelevel I made for an assignement at Noroff.
We were to design the layout of the level, build it with bsp-brushes first and then set-dress it afterwards, using only the included assets from the udk-engine. Afterwards we also had the task in utilizing kismet to make a survival game.

I made the level considering the assets in udk, and knew that a factory like level would grant me the most fitting assets to work with.

I designed the layout considering the survival mode of gameplay, and tried to make each playthrough seem a bit different, pushing the player towards trying the level again, and again.

This is, hopefully, achieved by how the level opens up more and more when you reach higher waves, in the end you even get to go out and play on what seemed to be only the backround at first.

After a lot of testing with the bsp-brushes in udk, I used the udk-assets and set dressed the level in finer details.`,
    tags: ['Level Design', 'UDK', '2014', 'Survival'],
    role: 'Level Designer',
    event: 'Noroff'
  }
]; 