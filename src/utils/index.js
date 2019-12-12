import jQuery from 'jquery';
import _ from 'lodash';
import { CONFIG_TAPD, CONFIG_CONFLUENCE, CONFIG_SLOT_PREFIX } from "./constants";

async function buildTapdConfig(url) {
  throw new Error("Not supportted yet");
}

async function buildConfluenceConfig(url) {
  const {data: html} = await request({ url });
  const page = jQuery(`<div>${html}</div>`);
  const codeBlocks = _.map(page.find('table.wysiwyg-macro'), (codeBlock, index) => {
    const parameters = _.chain(codeBlock.getAttribute('data-macro-parameters').split('|'))
      .map(s => s.split('='))
      .keyBy(0)
      .mapValues(1)
      .value();
    
    let content = codeBlock.textContent;
    const isJson = parameters.language === 'js' && ['{', '['].includes(content.trim()[0]);
    if (index === 0 || isJson) {
      try {
        content = JSON.parse(content);
      } catch (err) {
        console.error("Failed to parse JSON", url, parameters, content);
      }
    }
    
    return { ...parameters, content };
  });

  const mainCodeBlock = _.find(codeBlocks, { title: 'main' }) || codeBlocks[0];
  const variables = _.chain(codeBlocks).keyBy('title').mapValues('content').value();

  const recursiveMap = (data, replace) => {
    if (_.isArray(data)) {
      return _.map(data, item => recursiveMap(item, replace));
    }
    if (_.isObject(data)) {
      return _.mapValues(data, item => recursiveMap(item, replace));
    }

    const [newItem, recursive = false] = replace(data);
    return recursive ? recursiveMap(newItem, replace) : newItem;
  };

  return recursiveMap(mainCodeBlock.content, item => {
    const interested = typeof item === 'string' && item.startsWith(CONFIG_SLOT_PREFIX);
    if (!interested) {
      return [item];
    }
    const slotName = item.substring(CONFIG_SLOT_PREFIX.length);
    return [variables[slotName], true];
  });
}

export async function buildConfig(type, url) {
  switch (type) {
    case CONFIG_CONFLUENCE: {
      return buildConfluenceConfig(url);
      // break;
    }
    case CONFIG_TAPD: {
      return buildTapdConfig(url);
      // break;
    }
    default: {
      console.warn("Unknown config type", type, url);
      break;
    }
  }
}
