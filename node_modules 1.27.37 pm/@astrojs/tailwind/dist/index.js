import autoprefixerPlugin from "autoprefixer";
import tailwindPlugin from "tailwindcss";
async function getPostCssConfig(root, postcssInlineOptions) {
  let postcssConfigResult;
  if (!(typeof postcssInlineOptions === "object" && postcssInlineOptions !== null)) {
    let { default: postcssrc } = await import("postcss-load-config");
    const searchPath = typeof postcssInlineOptions === "string" ? postcssInlineOptions : root;
    try {
      postcssConfigResult = await postcssrc({}, searchPath);
    } catch (e) {
      postcssConfigResult = null;
    }
  }
  return postcssConfigResult;
}
async function getViteConfiguration(tailwindConfigPath, viteConfig) {
  var _a, _b;
  const postcssConfigResult = await getPostCssConfig(viteConfig.root, (_a = viteConfig.css) == null ? void 0 : _a.postcss);
  const postcssOptions = (postcssConfigResult == null ? void 0 : postcssConfigResult.options) ?? {};
  const postcssPlugins = ((_b = postcssConfigResult == null ? void 0 : postcssConfigResult.plugins) == null ? void 0 : _b.slice()) ?? [];
  postcssPlugins.push(tailwindPlugin(tailwindConfigPath));
  postcssPlugins.push(autoprefixerPlugin());
  return {
    css: {
      postcss: {
        options: postcssOptions,
        plugins: postcssPlugins
      }
    }
  };
}
function tailwindIntegration(options) {
  const applyBaseStyles = (options == null ? void 0 : options.applyBaseStyles) ?? true;
  const customConfigPath = options == null ? void 0 : options.configFile;
  return {
    name: "@astrojs/tailwind",
    hooks: {
      "astro:config:setup": async ({ config, updateConfig, injectScript }) => {
        updateConfig({
          vite: await getViteConfiguration(customConfigPath, config.vite)
        });
        if (applyBaseStyles) {
          injectScript("page-ssr", `import '@astrojs/tailwind/base.css';`);
        }
      }
    }
  };
}
export {
  tailwindIntegration as default
};
