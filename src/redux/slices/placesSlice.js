import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk 1: GET places from JSONPlaceholder (simulating places)
export const fetchPlaces = createAsyncThunk('places/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=30');
    // Map to places format
    return res.data.map((item, i) => ({
      id: item.id,
      title: PLACE_NAMES[i % PLACE_NAMES.length],
      region: REGIONS[i % REGIONS.length],
      category: CATEGORIES[i % CATEGORIES.length],
      description: DESCRIPTIONS[i % DESCRIPTIONS.length],
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      image: `https://picsum.photos/seed/${item.id + 10}/600/400`,
      duration: `${1 + (i % 5)} дн.`,
    }));
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const PLACE_NAMES = [
  'Иссык-Куль', 'Ала-Арча', 'Долина Джеты-Огуз', 'Каракол', 'Чолпон-Ата',
  'Горное озеро Сон-Куль', 'Ущелье Барскаун', 'Нарын', 'Таш-Рабат', 'Ош',
  'Узген', 'Арслан-Боб', 'Кулу', 'Бишкек центр', 'Дунган мечеть',
  'Торугарт', 'Манас Ордо', 'Кочкор', 'Боомское ущелье', 'Баткен',
  'Чаткал', 'Кара-Балта', 'Нукус', 'Майда-Адыр', 'Джалал-Абад',
  'Кек-Жар', 'Суусамыр', 'Шамши', 'Алтын-Арашан', 'Сказка',
];
const REGIONS = ['Иссык-Кульская', 'Чуйская', 'Ошская', 'Нарынская', 'Джалал-Абадская', 'Таласская', 'Баткенская'];
const CATEGORIES = ['Природа', 'История', 'Горы', 'Озёра', 'Культура', 'Юрты', 'Треккинг', 'Города'];
const DESCRIPTIONS = [
  'Жемчужина Центральной Азии — горное озеро с кристальной водой и величественными пиками вокруг.',
  'Уникальный природный заповедник с реликтовыми ореховыми лесами и чистыми горными реками.',
  'Живописное ущелье с красными скалами, термальными источниками и захватывающими дух видами.',
  'Древний торговый путь, хранящий тысячелетнюю историю Шёлкового пути.',
  'Высокогорное пастбище на 3016 м над уровнем моря — место кочевой культуры и звёздного неба.',
];

const placesSlice = createSlice({
  name: 'places',
  initialState: {
    items: [],
    filtered: [],
    loading: false,
    error: null,
    search: '',
    regionFilter: '',
    categoryFilter: '',
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      placesSlice.caseReducers.applyFilters(state);
    },
    setRegionFilter(state, action) {
      state.regionFilter = action.payload;
      placesSlice.caseReducers.applyFilters(state);
    },
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
      placesSlice.caseReducers.applyFilters(state);
    },
    applyFilters(state) {
      let result = state.items;
      if (state.search) {
        result = result.filter(p =>
          p.title.toLowerCase().includes(state.search.toLowerCase()) ||
          p.region.toLowerCase().includes(state.search.toLowerCase())
        );
      }
      if (state.regionFilter) {
        result = result.filter(p => p.region === state.regionFilter);
      }
      if (state.categoryFilter) {
        result = result.filter(p => p.category === state.categoryFilter);
      }
      state.filtered = result;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearch, setRegionFilter, setCategoryFilter } = placesSlice.actions;
export default placesSlice.reducer;
