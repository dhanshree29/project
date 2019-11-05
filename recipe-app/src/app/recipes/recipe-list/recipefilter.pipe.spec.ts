import { recipefilterPipe } from './recipefilter.pipe';

describe('recipefilterPipe', () => {
  let filterPipe: recipefilterPipe;

  // synchronous beforeEach
  beforeEach(() => {
    filterPipe = new recipefilterPipe();
  });

  it('create an instance', () => {
    expect(filterPipe).toBeTruthy();
  });

  it('should filter correctly', () => {
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
      indicator: 'nonveg',
      eatCount: 4,
      ingredients: [{ 'name': 'chicken' }, { 'name': 'tomato' }, { 'name': 'onion' },],
      instructions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      creationDate: "04-10-2019 12:30"
    });
    const filterArr = ['veg']
    const filtered = filterPipe.transform(items, filterArr);
    expect(filtered.length).toBe(1);
  });

});
