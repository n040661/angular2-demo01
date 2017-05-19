import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {

  constructor(private translate: TranslateService) {
      //添加语言支持
      translate.addLangs(['zh-CN', 'en']);
      //设置默认语言，一般在无法匹配的时候使用
      translate.setDefaultLang('zh-CN');

      //获取当前浏览器环境的语言比如en、 zh
      let broswerLang = translate.getBrowserLang();
      translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
  }
  //定义在select上下拉获取值的方法
  changeLang(lang) {
      console.log(`我是下拉框获取的值:${lang}`);
      //设置当前使用什么语言
      this.translate.use(lang);
  }
  //点击按钮获取当前是什么语音
  toggleLang() {
      console.log("我是点击按钮的:",this.translate.getBrowserLang());
      //获取语言风格，相当于更详细的语言类型，比如zh-CN、zh-TW、en-US
      console.log("我是点击按钮的:",this.translate.getBrowserCultureLang());
  }
  ngOnInit() {
  }

}
