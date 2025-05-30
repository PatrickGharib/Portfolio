// Custom Vite plugin to handle module resolution and improve build compatibility
export default function importMapPlugin() {
  return {
    name: 'vite-plugin-importmap',
    configResolved(config) {
      // Ensure proper module resolution is configured
      console.log('Import map plugin activated for production build');
    },
    transform(code, id) {
      // Special handling for Vuetify imports to avoid bare specifier errors
      if (id.includes('node_modules/vuetify/') && code.includes('export')) {
        // Ensure Vuetify exports are properly handled
        return {
          code,
          map: null
        };
      }
      
      // Handle problematic bare imports in the codebase
      if (code.includes('from "vuetify/') || code.includes("from 'vuetify/")) {
        const modified = code
          .replace(/from\s+["']vuetify\/([^"']+)["']/g, (match, p1) => {
            // Replace with full path imports if needed in development
            // In production, these will map to the bundled files
            return `from "vuetify/dist/vuetify.js"`;
          });
        
        return {
          code: modified,
          map: null
        };
      }
      
      // Handle direct imports of vuetify styles
      if (code.includes('import "vuetify/styles"') || code.includes("import 'vuetify/styles'")) {
        return {
          code: code
            .replace(/import\s+["']vuetify\/styles["'];?/g, "import './assets/vuetify-styles.css';")
            .replace(/import\s+["']vuetify\/styles\/["'];?/g, "import './assets/vuetify-styles.css';"),
          map: null
        };
      }
      
      return null;
    }
  };
}
