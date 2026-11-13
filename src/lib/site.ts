export const EMAIL = 'steffen.fureli@gmail.com';

export const SOCIAL_LINKS = {
  linkedin: {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/steffen-m-fureli-491b182b',
    display: 'linkedin.com/in/steffen-m-fureli-491b182b',
  },
  github: { label: 'GitHub', href: 'https://github.com/spikar1', display: 'github.com/spikar1' },
  itch: { label: 'itch.io', href: 'https://spikar1.itch.io', display: 'spikar1.itch.io' },
  discord: { label: 'Discord', href: 'https://discord.gg/HDCtyjsRsS', display: 'Join my Discord server' },
} as const;

export type SocialKey = keyof typeof SOCIAL_LINKS;
