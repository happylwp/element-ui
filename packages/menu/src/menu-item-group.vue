<template>
  <li class="el-menu-item-group">
    <div class="el-menu-item-group__title" :style="{paddingLeft: levelPadding + 'px'}">
      <template v-if="!$slots.title">{{title}}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'ElMenuItemGroup',

    componentName: 'ElMenuItemGroup',

    inject: ['rootMenu'],
    props: {
      title: {
        type: String
      }
    },
    data() {
      return {
        paddingLeft: 8
      };
    },
    computed: {
      levelPadding() {
        let padding = 8;
        let parent = this.$parent;
        if (this.rootMenu.collapse) return 8;
        while (parent && parent.$options.componentName !== 'ElMenu') {
          if (parent.$options.componentName === 'ElSubmenu') {
            padding += 8;
          }
          parent = parent.$parent;
        }
        return padding;
      }
    }
  };
</script>

