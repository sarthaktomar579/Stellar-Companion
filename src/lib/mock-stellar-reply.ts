/**
 * Offline demo replies when OPENAI_API_KEY is not set (local preview / CI).
 */
export function buildMockStellarReply(userText: string): string {
  const t = userText.toLowerCase();

  if (/orion|betelgeuse|rigel|m42|nebula/i.test(t)) {
    return `Orion is one of the easiest constellations to spot: look for three stars in a tight row—that is Orion’s Belt. Betelgeuse is the reddish shoulder; Rigel the bright blue foot. The “fuzzy star” below the belt is the Orion Nebula (M42), gorgeous in binoculars or any small scope.\n\nTip: Orion rides high in winter evenings for mid-northern latitudes. Give your eyes 15–20 minutes in dim light before expecting faint nebula detail.`;
  }

  if (/moon|lunar|phase|full moon|new moon|crescent/i.test(t)) {
    return `Moon phases follow the Sun–Earth–Moon geometry: “new” means the Moon is roughly between us and the Sun (thin crescent just after), “full” means Earth is between the Moon and Sun.\n\nFor observing: the terminator (day/night line) is where craters pop in 3D—great for small telescopes. A full Moon is bright and washes out faint deep-sky objects, but it is beautiful for lunar surface detail with filters.`;
  }

  if (/jupiter|saturn|mars|venus|mercury|planet/i.test(t)) {
    return `Naked-eye planets stand out because they do not twinkle like stars (usually): they are disks, not pinpoints.\n\nVenus is the brilliant “evening or morning star.” Jupiter is very bright and shows moons in binoculars. Saturn’s rings need a small telescope. Mars varies a lot—look for a steady orange point.\n\nTell me your rough latitude and whether you mean tonight or a specific month, and I can suggest where to look after sunset.`;
  }

  if (/light pollution|bortle|dark sky|city/i.test(t)) {
    return `Light pollution washes out the Milky Way and faint objects. Even moving to a shadowed corner of a park—away from direct lamps—helps. A red flashlight preserves night vision. Let your eyes adapt for 15–30 minutes before judging what you can see.\n\nIf you share your city or a map link, I can suggest what is realistic from your sky.`;
  }

  if (/telescope|binocular|scope|eyepiece|mount/i.test(t)) {
    return `Binoculars (e.g. 8×42 or 10×50) are underrated: open clusters, the Moon, Jupiter’s moons, and many doubles are lovely. For a first telescope, stable mounting matters as much as aperture—a wobbly high-power view frustrates beginners.\n\nStart with low magnification to find targets, then zoom in. Collimate reflectors when needed, and give the scope time to cool outside before critical viewing.`;

  }

  if (/meteor|shower|perseid|geminid|leonid/i.test(t)) {
    return `Meteor showers are best after midnight local time, when your part of Earth plows face-on into the debris stream. Lie back, scan broadly, and avoid staring at one spot—peripheral vision catches fast streaks.\n\nDress warmly, bring a reclining chair or blanket, and pick a dark site. Peak nights are busy but a day or two on either side can still be rewarding.`;

  }

  return `Welcome to the observatory deck. I am here for constellations, Moon and planets, gear basics, and how to get the most from your night under the stars.\n\nTry asking how to find Orion, what binoculars are good for beginners, or how moon phases affect stargazing.\n\n(Demo mode: add an OpenAI API key on Vercel as OPENAI_API_KEY for full AI replies.)`;

}
