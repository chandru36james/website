export interface PortfolioItem {
  id: number;
  category: 'Interior' | 'Construction';
  title: string;
  img: string;
}

const baseURL = "https://cdn.jsdelivr.net/gh/chandru36james/website@main/bloom%20greens/assets/images/";

const constructionImageNumbers: number[] = [
  ...Array.from({ length: 55 }, (_, i) => i + 1), // 1 to 55
  ...Array.from({ length: 15 }, (_, i) => i + 58) // 58 to 72
];

const interiorImageCount = 18;

export const portfolioItems: PortfolioItem[] = [
  // Construction Projects
  ...constructionImageNumbers.map((num, index) => ({
    id: index + 1,
    category: 'Construction' as 'Construction',
    title: `Modern Build ${index + 1}`,
    img: `${baseURL}construction%20(${num}).avif`,
  })),

  // Interior Design Projects
  ...Array.from({ length: interiorImageCount }, (_, i) => i + 1).map((num, index) => ({
    id: constructionImageNumbers.length + index + 1,
    category: 'Interior' as 'Interior',
    title: `Elegant Interior ${index + 1}`,
    img: `${baseURL}interior/interior%20(${num}).avif`,
  })),
];
