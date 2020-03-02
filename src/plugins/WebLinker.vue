<template>
    <div>
        <div id="mydiv">
            <img :src="logo"
                 :width="size"
                 :height="size"
                 id="mydivheader"
                 @click="open = !open">
            <div id='PageList'>
                <div v-for='(items,index) in urllist'
                     :key='index'
                     class='urlStyle'>
                    <a :href="items.url">{{items.name}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Vue, Prop, Watch, Component } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { FetchUrlsByUsername } from '@/http/apis'
import axios from 'axios'
const LayoutsModule = namespace('layouts')

@Component
export default class WebLinker extends Vue {
  @LayoutsModule.State('info') public info!: any
  public styleObject = {
    'top': '60%',
    'left': '',
    'flex-direction': 'column',
  };
  private logo = require('@/assets/icon.svg');
  private logo2 = require('@/assets/iconGreen.svg');
  private size = 60;
  private open = false;
  private urllist = [] as Array<{
    url: string,
    name: string,
    rolename: string,
  }>;
  public dragElement(elmnt: any) {
    // tslint:disable-next-line:one-variable-per-declaration
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + 'header')) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + 'header')!.onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) / (document.documentElement.clientHeight) * 100 + '%';
      elmnt.style.left = (elmnt.offsetLeft - pos1) / (document.documentElement.clientWidth) * 100 + '%';
      if ((elmnt.offsetTop - pos2) < 290) {
        elmnt.style['flex-direction'] = 'column';
      } else {
        elmnt.style['flex-direction'] = 'column-reverse';
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  public mounted() {
    this.dragElement(document.getElementById('mydiv'));
  }
  @Watch('info', { deep: true })
  public async onIDChange() {
    await FetchUrlsByUsername(this.info.given_name).then(
      (Response: any) => {
        this.urllist = Response;
      },
    )
  }
}
</script>
<style lang='scss'>
// drag payload
#mydiv {
  display: flex;
  flex-direction: column-reverse;
  position: fixed;
  top: 85%;
  z-index: 9;
  align-items: center;
  transition: flex-direction 0.25s;
  width: 120px;
  padding: 3px;
  & > #PageList {
    visibility: hidden;
    transition: 0.35s;
    opacity: 0;
  }
  &:hover {
    > #PageList {
      visibility: visible;
      opacity: 1;
      padding: 80px 0;
    }
    > #mydivheader {
      filter: drop-shadow(2px 7px 2px rgba(0, 0, 0, 0.4));
    }
  }
}
#PageList {
  display: inline;
  position: absolute;
  align-items: flex-start;
  text-align: center;
}

#mydivheader {
  display: block;
  cursor: move;
  z-index: 10;
  transition: 0.25s linear;
  border-radius: 50%;
}
.urlStyle {
  transition: 0.15s linear;
  padding: 5px 15px;
  margin: 5px 0px;
  // border: 1px rgba(0, 0, 0, 0.253) solid;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.15);
  &:hover {
    background-color: rgb(245, 245, 245);
  }
  & > a {
    text-decoration: none;
    font-weight: bold;
  }
}
// 鎖住
#locked {
  width: 50px;
  height: 50px;
  background-color: rgb(18, 14, 240);
  & > * {
    display: none;
  }
}
</style>