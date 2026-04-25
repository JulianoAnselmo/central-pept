import { matchKeywords } from './keywords';

const SUBREDDITS = [
  'Peptides',
  'Semaglutide',
  'Mounjaro',
  'tirzepatide',
  'fitnessbr',
  'musculacaobrasil',
  'loseit',
  'ozempic_weightloss',
];

export interface RedditPost {
  sourceId: string;
  url: string;
  title: string;
  snippet: string;
  matchedKeywords: string[];
  subreddit: string;
}

export async function fetchRedditQuestions(): Promise<RedditPost[]> {
  const results: RedditPost[] = [];

  for (const sub of SUBREDDITS) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/new.json?limit=25`,
        {
          headers: { 'User-Agent': 'centralpeptideos-bot/1.0' },
          next: { revalidate: 0 },
        }
      );
      if (!res.ok) continue;

      const json = (await res.json()) as {
        data: { children: Array<{ data: { id: string; title: string; selftext: string; permalink: string } }> };
      };

      for (const child of json.data.children) {
        const { id, title, selftext, permalink } = child.data;
        const combinedText = `${title} ${selftext}`;
        const matched = matchKeywords(combinedText);
        if (matched.length === 0) continue;

        results.push({
          sourceId: `reddit_${id}`,
          url: `https://reddit.com${permalink}`,
          title,
          snippet: selftext.slice(0, 300),
          matchedKeywords: matched,
          subreddit: sub,
        });
      }
    } catch {
      // ignora falha de rede num sub específico
    }
  }

  return results;
}
