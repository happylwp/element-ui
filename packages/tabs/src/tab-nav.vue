<script>
  import TabBar from './tab-bar';
  import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';

  function noop() {}
  const firstUpperCase = str => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  };

  export default {
    name: 'TabNav',

    components: {
      TabBar
    },

    inject: ['rootTabs'],

    props: {
      panes: Array,
      currentName: String,
      editable: Boolean,
      onTabClick: {
        type: Function,
        default: noop
      },
      onTabRemove: {
        type: Function,
        default: noop
      },
      type: String,
      mode: String,
      stretch: Boolean
    },

    data() {
      return {
        scrollable: false,
        navOffset: 0,
        isFocus: false,
        focusable: true,
        moreShow: false, // 默认展示 主要控制更多按钮，不能仅通过 moreIndex 控制
        moreIndex: -1
      };
    },

    computed: {
      navStyle() {
        const dir = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'X' : 'Y';
        return {
          transform: `translate${dir}(-${this.navOffset}px)`
        };
      },
      sizeName() {
        return ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'width' : 'height';
      },
      moreLabel() {
        if (this.moreShow) {
          let moreLabel = '';
          for (let index = 0; index < this.panes.length; index++) {
            const pane = this.panes[index];
            if (pane.active) {
              // 只按照label 展示, 不展示插槽
              // 非收起 tabItem active，更多按钮 展示更多
              moreLabel = this.moreIndex < index ? pane.label : '';
              break;
            }
          }

          return moreLabel;
        }
        return '';
      }
    },

    methods: {
      scrollPrev() {
        const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
        const currentOffset = this.navOffset;

        if (!currentOffset) return;

        let newOffset = currentOffset > containerSize
          ? currentOffset - containerSize
          : 0;

        this.navOffset = newOffset;
      },
      scrollNext() {
        const navSize = this.$refs.nav[`offset${firstUpperCase(this.sizeName)}`];
        const containerSize = this.$refs.navScroll[`offset${firstUpperCase(this.sizeName)}`];
        const currentOffset = this.navOffset;

        if (navSize - currentOffset <= containerSize) return;

        let newOffset = navSize - currentOffset > containerSize * 2
          ? currentOffset + containerSize
          : (navSize - containerSize);

        this.navOffset = newOffset;
      },
      scrollToActiveTab() {
        if (!this.scrollable) return;
        const nav = this.$refs.nav;
        const activeTab = this.$el.querySelector('.is-active');
        if (!activeTab) return;
        const navScroll = this.$refs.navScroll;
        const isHorizontal = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1;
        const activeTabBounding = activeTab.getBoundingClientRect();
        const navScrollBounding = navScroll.getBoundingClientRect();
        const maxOffset = isHorizontal
          ? nav.offsetWidth - navScrollBounding.width
          : nav.offsetHeight - navScrollBounding.height;
        const currentOffset = this.navOffset;
        let newOffset = currentOffset;

        if (isHorizontal) {
          if (activeTabBounding.left < navScrollBounding.left) {
            newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
          }
          if (activeTabBounding.right > navScrollBounding.right) {
            newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
          }
        } else {
          if (activeTabBounding.top < navScrollBounding.top) {
            newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
          }
          if (activeTabBounding.bottom > navScrollBounding.bottom) {
            newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
          }
        }
        newOffset = Math.max(newOffset, 0);
        this.navOffset = Math.min(newOffset, maxOffset);
      },
      updateMoreIndex() {
        this.moreIndex = -1;
        this.moreShow = false;
        this.$nextTick(()=> {
          const sizeName = this.sizeName;
          const navSize = this.$refs.nav[`offset${firstUpperCase(sizeName)}`];
          const containerSize = this.$refs.navScroll[`offset${firstUpperCase(sizeName)}`];

          if (containerSize < navSize) {
            let moreIndex = -1;
            this.moreIndex = moreIndex;
            this.moreShow = true;
  
            this.$nextTick(()=> {
              const children = Array.from(this.$refs.nav.childNodes || []);
              const tabItems = [];
              let dropdown = null;
              children.forEach(item => {
                if (item.className) {
                  if (item.className.includes('el-tabs__item')) {
                    tabItems.push(item);
                  } else if (item.className.includes('el-dropdown')) {
                    dropdown = item;
                  }
                }
              });
              // 20 为间隔宽度
              let dropDownWith = dropdown ? dropdown.getBoundingClientRect().width : 0;
              let contentWidth = dropDownWith; // 初始默认按钮宽
              for (let index = 0; index < tabItems.length; index++) {
                const element = tabItems[index];
                contentWidth = element.getBoundingClientRect().width + contentWidth;
                if (contentWidth > containerSize) {
                  moreIndex = index - 1;
                  break;
                }
              }
              this.moreIndex = moreIndex;
              this.moreShow = moreIndex !== -1;
            });
          } else {
            this.moreIndex = -1;
            this.moreShow = false;
          }
        });
      },

      dropdownCommand(command) {
  
      },

      update() {
        if (!this.$refs.nav) return;
        const sizeName = this.sizeName;
        const navSize = this.$refs.nav[`offset${firstUpperCase(sizeName)}`];
        const containerSize = this.$refs.navScroll[`offset${firstUpperCase(sizeName)}`];

        // 更多类型，左右切换变为更多
        if (this.mode !== 'more') {
          if (containerSize < navSize) {
            const currentOffset = this.navOffset;
            this.scrollable = this.scrollable || {};
            this.scrollable.prev = currentOffset;
            this.scrollable.next = currentOffset + containerSize < navSize;
            if (navSize - currentOffset < containerSize) {
              this.navOffset = navSize - containerSize;
            }
          } else {
            const currentOffset = this.navOffset;
            this.scrollable = false;
            if (currentOffset > 0) {
              this.navOffset = 0;
            }
          }
        }
      },
      changeTab(e) {
        const keyCode = e.keyCode;
        let nextIndex;
        let currentIndex, tabList;
        if ([37, 38, 39, 40].indexOf(keyCode) !== -1) { // 左右上下键更换tab
          tabList = e.currentTarget.querySelectorAll('[role=tab]');
          currentIndex = Array.prototype.indexOf.call(tabList, e.target);
        } else {
          return;
        }
        if (keyCode === 37 || keyCode === 38) { // left
          if (currentIndex === 0) { // first
            nextIndex = tabList.length - 1;
          } else {
            nextIndex = currentIndex - 1;
          }
        } else { // right
          if (currentIndex < tabList.length - 1) { // not last
            nextIndex = currentIndex + 1;
          } else {
            nextIndex = 0;
          }
        }
        tabList[nextIndex].focus(); // 改变焦点元素
        tabList[nextIndex].click(); // 选中下一个tab
        this.setFocus();
      },
      setFocus() {
        if (this.focusable) {
          this.isFocus = true;
        }
      },
      removeFocus() {
        this.isFocus = false;
      },
      visibilityChangeHandler() {
        const visibility = document.visibilityState;
        if (visibility === 'hidden') {
          this.focusable = false;
        } else if (visibility === 'visible') {
          setTimeout(() => {
            this.focusable = true;
          }, 50);
        }
      },
      windowBlurHandler() {
        this.focusable = false;
      },
      windowFocusHandler() {
        setTimeout(() => {
          this.focusable = true;
        }, 50);
      }
    },

    updated() {
      this.update();
    },

    render(h) {
      const {
        type,
        panes,
        editable,
        stretch,
        onTabClick,
        onTabRemove,
        navStyle,
        scrollable,
        scrollNext,
        scrollPrev,
        changeTab,
        setFocus,
        removeFocus,
        mode,
        moreShow,
        moreIndex
      } = this;
      const scrollBtn = scrollable
        ? [
          <span class={['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled']} on-click={scrollPrev}><i class="el-icon-arrow-left"></i></span>,
          <span class={['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled']} on-click={scrollNext}><i class="el-icon-arrow-right"></i></span>
        ] : null;

      const tabs = [];
      const dropdowns = [];

      this._l(panes, (pane, index) => {
        let tabName = pane.name || pane.index || index;
        const closable = pane.isClosable || editable;

        pane.index = `${index}`;

        const btnClose = closable
          ? <span class="el-icon-close" on-click={(ev) => { onTabRemove(pane, ev); }}></span>
          : null;

        const tabLabelContent = pane ? (pane.$slots.label || pane.label) : '';
        const tabindex = pane.active ? 0 : -1;
  
        if (moreIndex !== -1 && moreIndex < index) {
          dropdowns.push(<el-dropdown-item
            class={{
              'el-tabs--dropdown-item': true,
              'is-active': pane.active,
              'is-disabled': pane.disabled
            }}
            nativeOn-click={(ev) => { removeFocus(); onTabClick(pane, tabName, ev); this.updateMoreIndex(); }}
          >{tabLabelContent}</el-dropdown-item>);
        } else {
          tabs.push((
            <div
              class={{
                'el-tabs__item': true,
                [`is-${ this.rootTabs.tabPosition }`]: true,
                'is-active': pane.active,
                'is-disabled': pane.disabled,
                'is-closable': closable,
                'is-focus': this.isFocus
              }}
              id={`tab-${tabName}`}
              key={`tab-${tabName}`}
              aria-controls={`pane-${tabName}`}
              role="tab"
              aria-selected={ pane.active }
              ref="tabs"
              tabindex={tabindex}
              refInFor
              on-focus={ ()=> { setFocus(); }}
              on-blur ={ ()=> { removeFocus(); }}
              on-click={(ev) => { removeFocus(); onTabClick(pane, tabName, ev); }}
              on-keydown={(ev) => { if (closable && (ev.keyCode === 46 || ev.keyCode === 8)) { onTabRemove(pane, ev);} }}
            >
              {tabLabelContent}
              {btnClose}
            </div>
          ));
        }
      });
  
      return (
        <div class={['el-tabs__nav-wrap', scrollable ? 'is-scrollable' : '', `is-${ this.rootTabs.tabPosition }`]}>
          {scrollBtn}
          <div class={['el-tabs__nav-scroll']} ref="navScroll">
            <div
              class={['el-tabs__nav', `is-${ this.rootTabs.tabPosition }`, stretch && ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'is-stretch' : '', this.mode === 'more' ? 'el-tabs__nav--more' : '']}
              ref="nav"
              style={navStyle}
              role="tablist"
              on-keydown={ changeTab }
            >
              {!type ? <tab-bar tabs={panes} parent={this}></tab-bar> : null}
              {tabs}{mode === 'more' && moreShow ? <el-dropdown
                ref="tabDropdown"
                class="el-tabs--dropdown"
                id="el-tabs--dropdown"
                onCommand={ this.dropdownCommand }
                trigger="click">
                <el-button class="dropdown-btn">{ this.moreLabel || '更多' }<i class="el-icon-arrow-down"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  {dropdowns}
                </el-dropdown-menu>
              </el-dropdown> : null}
            </div>
          </div>
        </div>
      );
    },

    mounted() {
      addResizeListener(this.$el, this.update);
      if (this.mode === 'more') {
        addResizeListener(this.$el, this.updateMoreIndex);
      }
      document.addEventListener('visibilitychange', this.visibilityChangeHandler);
      window.addEventListener('blur', this.windowBlurHandler);
      window.addEventListener('focus', this.windowFocusHandler);
      setTimeout(() => {
        this.scrollToActiveTab();
      }, 0);
    },

    beforeDestroy() {
      if (this.$el && this.update) removeResizeListener(this.$el, this.update);
      if (this.mode === 'more' && this.$el && this.updateMoreIndex) removeResizeListener(this.$el, this.updateMoreIndex);
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
      window.removeEventListener('blur', this.windowBlurHandler);
      window.removeEventListener('focus', this.windowFocusHandler);
    }
  };
</script>
