{% macro render(name, itemName, value) %}

  {%- set itemURL = value.split('||')[0] | trim %}
  {%- if not itemURL.startsWith('http') %}
    {%- set itemURL = itemURL | replace('//', '/') %}
  {%- endif %}
  <li class="menu-item menu-item-{{ itemName | replace(' ', '-') }}">

    {%- set menuIcon = '' %}
    {%- if theme.menu_settings.icons %}
      {%- set menuIcon = '<i class="' + value.split('||')[1] | trim + ' fa-fw"></i>' %}
    {%- endif %}
    {%- set menuText = __('menu.' + name) | replace('menu.', '') %}

    {%- set menuBadge = '' %}
    {%- if theme.menu_settings.badges %}
      {%- set badges = {
        archives  : site.posts.length,
        categories: site.categories.length,
        tags      : site.tags.length,
        数据: site.dataPosts.length,
        机器学习: site.mlPosts.length,
        敏捷: site.agilePosts.length,
        技术: site.techPosts.length,
        架构: site.archPosts.length,
        其他: site.otherPosts.length
        }
      %}
      {%- for menu, count in badges %}
        {%- if name == menu %}
          {%- set menuBadge = '<span class="badge">' + count + '</span>' %}
        {%- endif %}
      {%- endfor %}
    {%- endif %}

    {{ next_url(itemURL, menuIcon + menuText + menuBadge, {rel: 'section'}) }}

  </li>

{% endmacro %}
