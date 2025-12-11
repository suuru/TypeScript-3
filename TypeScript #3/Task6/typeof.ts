// Create settings object with const assertion
const settings = { 
  theme: 'dark', 
  layout: 'grid', 
  pageSize: 20 
} as const;

// Define SettingsKeys type using keyof typeof
type SettingsKeys = keyof typeof settings;
// SettingsKeys is: 'theme' | 'layout' | 'pageSize'

// Get the type of settings values
type SettingsValues = typeof settings[SettingsKeys];
// SettingsValues is: 'dark' | 'grid' | 20

// Function to get a setting value by key
function getSetting<K extends SettingsKeys>(key: K): typeof settings[K] {
  return settings[key];
}

// Function to check if a key exists in settings
function isValidSettingKey(key: string): key is SettingsKeys {
  return key in settings;
}

// Function to get all setting keys
function getSettingKeys(): SettingsKeys[] {
  return Object.keys(settings) as SettingsKeys[];
}

// Function to update settings (returns new object, doesn't mutate)
function updateSetting<K extends SettingsKeys>(
  key: K, 
  value: typeof settings[K]
): typeof settings {
  return {
    ...settings,
    [key]: value
  };
}

// Examples
console.log('Theme:', getSetting('theme')); // 'dark'
console.log('Layout:', getSetting('layout')); // 'grid'
console.log('Page Size:', getSetting('pageSize')); // 20

// Type safety - these would cause TypeScript errors:
// getSetting('invalid'); // Error: Argument of type '"invalid"' is not assignable
// settings.theme = 'light'; // Error: Cannot assign to 'theme' because it is a read-only property

// Check if key is valid
console.log(isValidSettingKey('theme')); // true
console.log(isValidSettingKey('invalid')); // false

// Get all keys
const keys = getSettingKeys();
console.log('All keys:', keys); // ['theme', 'layout', 'pageSize']

// Update setting
const newSettings = updateSetting('theme', 'dark');
console.log('Updated settings:', newSettings);

// Type inference works correctly
const themeValue = getSetting('theme'); // type is 'dark' (literal type)
const pageSizeValue = getSetting('pageSize'); // type is 20 (literal type)

// Iterate over settings
keys.forEach((key) => {
  console.log(`${key}: ${settings[key]}`);
});

// Using with type narrowing
function processSettingValue(key: SettingsKeys) {
  const value = settings[key];
  
  if (typeof value === 'string') {
    console.log(`String setting ${key}: ${value.toUpperCase()}`);
  } else if (typeof value === 'number') {
    console.log(`Number setting ${key}: ${value * 2}`);
  }
}

processSettingValue('theme');
processSettingValue('pageSize');

// Dictionary type for translations
type TranslationMap = { [key: string]: string };

// Simple translation map
const translations: TranslationMap = {
  'theme': 'Tema',
  'layout': 'Diseño',
  'pageSize': 'Tamaño de página',
  'dark': 'Oscuro',
  'grid': 'Cuadrícula',
  'welcome': 'Bienvenido',
  'goodbye': 'Adiós'
};

// Function to get translation
function translate(key: string): string {
  return translations[key] || key;
}

// Function to add translation
function addTranslation(key: string, value: string): void {
  translations[key] = value;
}

// Function to check if translation exists
function hasTranslation(key: string): boolean {
  return key in translations;
}

// Examples using translation map
console.log(translate('theme')); // 'Tema'
console.log(translate('welcome')); // 'Bienvenido'
console.log(translate('unknown')); // 'unknown' (returns key if not found)

// Translate setting keys
keys.forEach((key) => {
  console.log(`${translate(key)}: ${settings[key]}`);
});

// Add new translation
addTranslation('light', 'Claro');
console.log(translate('light')); // 'Claro'

// Check if translation exists
console.log(hasTranslation('theme')); // true
console.log(hasTranslation('notfound')); // false

// Create a translated settings display
function displaySettingsTranslated() {
  const settingKeys = getSettingKeys();
  settingKeys.forEach((key) => {
    const translatedKey = translate(key);
    const value = settings[key];
    const translatedValue = typeof value === 'string' ? translate(value) : value;
    console.log(`${translatedKey}: ${translatedValue}`);
  });
}

displaySettingsTranslated();