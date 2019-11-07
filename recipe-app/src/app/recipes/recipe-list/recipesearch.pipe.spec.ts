import { RecipesearchPipe } from './recipesearch.pipe';

describe('RecipesearchPipe', () => {
  let searchPipe: RecipesearchPipe;

  beforeEach(() => {
    searchPipe = new RecipesearchPipe();
  });

  it('create an instance', () => {
    expect(searchPipe).toBeTruthy();
  });

  it('should return null if no items given', () => {
    const items = null;
    const filtered = searchPipe.transform(items, 'chicken');
    expect(filtered).toBe(null);
  });

  it('should return items if no args is given', () => {
    const items = [];
    items.push({
      id: 1,
      name: 'Chicken Masala',
      imagePath: '/assets/masala-chicken.jpg',
      indicator: 'veg',
      eatCount: 4,
      ingredients: [{ name: 'chicken' }, { name: 'tomato' }, { name: 'onion' },],
      instructions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      creationDate: "04-10-2019 12:30"
    });

    const filtered = searchPipe.transform(items, null);
    expect(filtered).toEqual(items);
  });

  it('should search correctly', () => {
    const items = [];
    items.push({
      id: 1,
      name: 'chicken masala',
      imagePath: '/assets/masala-chicken.jpg',
      indicator: 'veg',
      eatCount: 4,
      ingredients: [{ 'name': 'chicken' }, { 'name': 'tomato' }, { 'name': 'onion' },],
      instructions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      creationDate: "04-10-2019 12:30"
    });
    items.push({
      id: 2,
      name: 'chicken patice',
      imagePath: '/assets/masala-chicken.jpg',
      indicator: 'veg',
      eatCount: 4,
      ingredients: [{ 'name': 'chicken' }, { 'name': 'tomato' }, { 'name': 'onion' },],
      instructions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      creationDate: "04-10-2019 12:30"
    });

    const filtered = searchPipe.transform(items, 'chicken masala');
    expect(filtered.length).toBe(1);
  });

});
