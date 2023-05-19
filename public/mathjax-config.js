window.MathJax = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
    tags: 'ams',
    autoload: {
      color: [],
      colorv2: ['color'],
    },
    packages: { '[+]': ['noerrors'] },
  },
  options: {
    ignoreHtmlClass: 'no-mathjax|redactor-editor|redactor-box',
    processHtmlClass: 'mathjax',
    enableMenu: false,
    renderActions: {
      addCopyText: [
        156,
        (doc) => {
          if (!doc.processed.isSet('addtext')) {
            for (const math of doc.math) MathJax.config.addCopyText(math, doc);
            doc.processed.set('addtext');
          }
        },
        (math, doc) => MathJax.config.addCopyText(math, doc),
      ],
    },
  },
  chtml: {
    scale: 0.9,
  },
  loader: {
    load: ['input/tex', 'output/chtml', '[tex]/noerrors'],
  },
  addCopyText(math, doc) {
    if (math.state() < MathJax.STATE.ADDTEXT) {
      if (!math.isEscaped) {
        const adaptor = doc.adaptor;
        const text = adaptor.node(
          'span',
          { 'aria-hidden': true, class: 'no-mathjax mjx-copytext' },
          [adaptor.text(math.start.delim + math.math + math.end.delim)]
        );
        adaptor.append(math.typesetRoot, text);
        if (math.start.n == 0) {
          adaptor.insert(
            adaptor.text('\u200A'),
            adaptor.firstChild(math.typesetRoot)
          );
        }
        if (math.end.n == math.end.node.length) {
          adaptor.append(math.typesetRoot, adaptor.text('\u200A'));
        }
      }
      math.state(MathJax.STATE.ADDTEXT);
    }
  },
  startup: {
    ready() {
      const { newState, STATE } = MathJax._.core.MathItem;
      const { AbstractMathDocument } = MathJax._.core.MathDocument;
      const { CHTML } = MathJax._.output.chtml_ts;
      newState('ADDTEXT', 156);
      AbstractMathDocument.ProcessBits.allocate('addtext');
      CHTML.commonStyles['mjx-copytext'] = {
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        opacity: 0,
        overflow: 'hidden',
      };
      MathJax.STATE = STATE;
      MathJax.startup.defaultReady();
    },
  },
};
