/* global NexT, CONFIG, Velocity */

NexT.boot = {};

NexT.boot.registerEvents = function() {

  NexT.utils.registerScrollPercent();
  NexT.utils.registerCanIUseTag();

  // Mobile top menu bar.
  document.querySelector('.site-nav-toggle .toggle').addEventListener('click', () => {
    event.currentTarget.classList.toggle('toggle-close');
    var siteNav = document.querySelector('.site-nav');
    var animateAction = siteNav.classList.contains('site-nav-on') ? 'slideUp' : 'slideDown';

    if (typeof Velocity === 'function') {
      Velocity(siteNav, animateAction, {
        duration: 200,
        complete: function() {
          siteNav.classList.toggle('site-nav-on');
        }
      });
    } else {
      siteNav.classList.toggle('site-nav-on');
    }
  });

  var TAB_ANIMATE_DURATION = 200;
  document.querySelectorAll('.sidebar-nav li').forEach((element, index) => {
    element.addEventListener('click', event => {
      var item = event.currentTarget;
      var activeTabClassName = 'sidebar-nav-active';
      var activePanelClassName = 'sidebar-panel-active';
      if (item.classList.contains(activeTabClassName)) return;

      var targets = document.querySelectorAll('.sidebar-panel');
      var target = targets[index];
      var currentTarget = targets[1 - index];
      window.anime({
        targets : currentTarget,
        duration: TAB_ANIMATE_DURATION,
        easing  : 'linear',
        opacity : 0,
        complete: () => {
          // Prevent adding TOC to Overview if Overview was selected when close & open sidebar.
          currentTarget.classList.remove(activePanelClassName);
          target.style.opacity = 0;
          target.classList.add(activePanelClassName);
          window.anime({
            targets : target,
            duration: TAB_ANIMATE_DURATION,
            easing  : 'linear',
            opacity : 1
          });
        }
      });

      [...item.parentNode.children].forEach(element => {
        element.classList.remove(activeTabClassName);
      });
      item.classList.add(activeTabClassName);
    });
  });

  window.addEventListener('resize', NexT.utils.initSidebarDimension);

  window.addEventListener('hashchange', () => {
    var tHash = location.hash;
    if (tHash !== '' && !tHash.match(/%\S{2}/)) {
      var target = document.querySelector(`.tabs ul.nav-tabs li a[href="${tHash}"]`);
      target && target.click();
    }
  });
};

NexT.boot.refresh = function() {

  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'layout/_partials/head.swig' file.
   */
  CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
  CONFIG.mediumzoom && window.mediumZoom('.post-body :not(a) > img, .post-body > img');
  CONFIG.lazyload && window.lozad('.post-body img').observe();
  CONFIG.pangu && window.pangu.spacingPage();

  CONFIG.exturl && NexT.utils.registerExtURL();
  CONFIG.copycode.enable && NexT.utils.registerCopyCode();
  NexT.utils.registerTabsTag();
  NexT.utils.registerActiveMenuItem();
  NexT.utils.registerLangSelect();
  NexT.utils.registerSidebarTOC();
  NexT.utils.wrapTableWithBox();
  NexT.utils.registerVideoIframe();
};

NexT.boot.motion = function() {
  // Define Motion Sequence & Bootstrap Motion.
  if (CONFIG.motion.enable) {
    NexT.motion.integrator
      .add(NexT.motion.middleWares.logo)
      .add(NexT.motion.middleWares.menu)
      .add(NexT.motion.middleWares.postList)
      .add(NexT.motion.middleWares.sidebar)
      .bootstrap();
  }
  NexT.utils.updateSidebarPosition();
};

document.addEventListener('DOMContentLoaded', () => {
  NexT.boot.registerEvents();
  NexT.boot.refresh();
  NexT.boot.motion();
});


var links = {"NDUzMjg1": "/2022/05/30/neat-syntax-design-of-an-etl-language-part-2/", "NDU0MTkx": "/2022/06/08/efficient-etl-testing/", "NDUwNjU0": "/2022/05/04/a-new-etl-language-easy-sql/", "NDUyNzQw": "/2022/05/25/neat-syntax-design-of-an-etl-language/", "NDU5MTYz": "/2022/07/28/modelling-examples/", "NDUyNjE3": "/2022/05/24/5-properties-of-good-code-cupid/", "NDU2ODY3": "/2022/07/05/tdd-to-develop-a-long-running-task-system/", "NDUxODcy": "/2022/05/16/a-guide-to-write-elegant-etl/", "NDU5MDE5": "/2022/07/27/smart-domain-and-ddd/", "MjE2Nzc0": "/2015/12/08/first-blog/", "MjE2NzE0": "/2015/12/08/pitfall-jasmin-any/", "MjY2MTYz": "/2017/04/15/understanding-gradients-of-conv2d-in-experiments/", "MjU3Mjg": "/2017/01/16/dl-workshop-massive-network-tips/", "Mjg1NDc5": "/2017/10/25/aws-openshift-cluster-installation-guide/", "Mjg5NzE2": "/2017/12/07/automated-comment-on-xiaomi-s-live-stream/", "Mjg1NzY0": "/2017/10/28/openshift-workshop/", "Mjg1MzY": "/2017/10/24/local-openshift-cluster-installation-guide/", "MjczMzgx": "/2017/06/26/dive-into-gan-continued/", "MjYxNjIy": "/2017/03/01/recognize-house-number/", "MjcyODk": "/2017/06/21/dive-into-gan/", "MzQ4Njky": "/2019/07/19/python-json-serializable-lib/", "MzQ5MTQ4": "/2019/07/24/what-programmer-should-know-about-compiler/", "MzUyNDcz": "/2019/08/26/the-functional-programming-you-understand-may-not-be-what-we-recommended/", "MzYyMjc1": "/2019/12/02/sense-of-ceremony-and-professional-service/", "MzU4NjQw": "/2019/10/27/hadoop-auth/", "MzUzNDIz": "/2019/09/05/programmers-tolerance/", "MzU2NjI": "/2019/10/07/after-reading-of-refactoring-v2/", "MzQ3NTEz": "/2019/07/08/reproduce-ml-models/", "MzQ4NzI0": "/2019/07/20/tdd-for-improving-design/", "MzQ5MjI5": "/2019/07/25/ways-to-improve-python-perf/", "MzYyMjUz": "/2019/12/02/hadoop-auth-4/", "MzY0MjIx": "/2019/12/22/its-harder-to-go-downhill/", "MzYwMTEy": "/2019/11/11/hadoop-auth-3/", "MzQ3NTgz": "/2019/07/08/reproduce-ml-models-dorn/", "MzU4OTM0": "/2019/10/30/hadoop-auth-2/", "MzUwNjQ3": "/2019/08/08/domain-concept-in-your-code/", "MzUxNjMy": "/2019/08/18/tdd-for-improving-design-2/", "MzQ3OTYw": "/2019/07/12/reproduce-ml-models-efficientnet/", "MzUwNDgz": "/2019/08/06/you-may-need-a-lightweight-zhongtai/", "NDA3MDY": "/2021/02/22/data-ingestion-from-mongo/", "NDA2OTcz": "/2021/02/21/data-governance-based-on-atlas-ranger/", "NDExMjU2": "/2021/04/05/dwd-modeling-automation/", "NDA3NzM": "/2021/03/01/data-ingestion-practice/", "NDAzOTY2": "/2021/01/22/bigdata-platform-based-on-hdp/", "NDEzMjY2": "/2021/04/25/data-testing-tool/", "NDEwMzg": "/2021/03/27/programmer-efficiency/", "NDEyNzgw": "/2021/04/20/data-testing/", "NDExNzYx": "/2021/04/10/data-development-tools/", "NDE2MTY5": "/2021/05/24/data-pipeline-for-data-project/", "NDA5MTYw": "/2021/03/15/data-management-practice/", "NDE0Nzgy": "/2021/05/10/data-browser-for-point-analysis/", "NDEwODIz": "/2021/04/01/data-development-language-and-environment/", "NDAzODM5": "/2021/01/21/some-thoughts-about-data-platform/", "NDA5Mjc0": "/2021/03/16/data-modeling-practice/", "MzY3MjE4": "/2020/01/21/spark-performance-tuning-on-billions-of-data/", "Mzk4MjU4": "/2020/11/26/data-work-roles/", "NDAxMzcw": "/2020/12/27/oracle-data-migration/", "MzcxOTE4": "/2020/03/08/new-ways-to-manage-memory/", "Mzc1NDky": "/2020/04/12/an-apprehensible-way-to-describe-ctr--introduction/", "Mzc5NDg0": "/2020/05/22/architecture-designing-practise-for-ml-platform/", "MzY1NjU1": "/2020/01/05/DDD-in-pipeline-code/", "Mzc5NjQ5": "/2020/05/24/architecture-designing-practise-for-ml-platform-oop/", "MzY4ODI5": "/2020/02/06/DRL-the-problem/", "MzgwNDQz": "/2020/06/01/node-bpm/", "Mzc5NTU4": "/2020/05/23/architecture-designing-practise-for-ml-platform-configuration/", "MzczNDc": "/2020/03/23/rust-the-good-part/", "Mzg0MDQz": "/2020/07/07/basic-loan-business/", "Mzk4OTIx": "/2020/12/03/data-capability-building-suggestions/", "MzkwNTEy": "/2020/09/10/easy-statistical-test/", "MzkwODQw": "/2020/09/13/correlation-analysis/", "Mzc0MDcx": "/2020/03/29/native-code-compilation-process-programmers-should-know/", "Mzg4NjQ2": "/2020/08/22/data-analyst-mindset/", "MzA0NzYx": "/2018/05/06/reinforcement-learning-mdp/", "MjI3NjYx": "/2016/03/26/transparent-video/", "MjI2NDUw": "/2016/03/14/bluetooth-summary/", "MjMwNjUw": "/2016/04/25/must-have-admin-site-for-spring-projects/", "MjI1OTI2": "/2016/03/09/self-cultivation-of-a-programmer/", "MjUyNzEw": "/2016/12/02/dl-workshop-rnn-and-lstm/", "MjM4MTQ4": "/2016/07/09/backtracking-search-for-a-game/", "MjU0MTQ1": "/2016/12/16/dl-workshop-summary/", "MjUyMjUz": "/2016/11/27/a-pick-into-tensorflow/", "MjM4OTg0": "/2016/07/17/session-storage/", "MjI4MDA": "/2016/03/30/migrate-to-spring-boot/", "MjMwNjY0": "/2016/04/25/docker-and-micro-service/", "MjMyNzY2": "/2016/05/16/business-trip-life-in-sydney/", "MjMwNzYz": "/2016/04/26/about-micro-service-architecture/", "MjI1ODI4": "/2016/03/08/ghost-space-in-less/", "MjI2Nzkz": "/2016/03/17/opengl-summary/", "MjQzNDk1": "/2016/08/31/agile-user-story/", "MjQyODg": "/2016/08/25/tdd-practise/", "MjIwNTk2": "/2016/01/15/css-best-practise/", "MjUzMDc5": "/2016/12/05/let-machine-play-games/", "MjI1NDE3": "/2016/03/04/maven-tips/", "MjUzNjQz": "/2016/12/11/dl-workshop-rnn-and-lstm-1/", "MjI5Njk3": "/2016/04/15/pitfall-collection/", "MjI1ODY0": "/2016/03/08/pitfall-clearfix-with-table-display/"}
try {
  (function(){
    if (window.location.hash) {
      var link = window.location.hash.substring(2);
      if (links[link]) {
        window.location.href=links[link];
      }
    }
  })()
} catch (e) {}


