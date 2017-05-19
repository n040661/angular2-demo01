## 下载项目后使用方式
* npm install
* npm run start

----
### angular2中开发国际化(一个页面中来回切换几种语言)
#### 实现国际化基本步骤
* 1、使用`angular-cli`创建一个项目工程
* 2、创建一个组件`page3`的`demo`来展现国际化功能
* 3、使用`npm`安装`ngx-translate`模块
    * `npm install --save @ngx-translate/core`
    * `npm install --save @ngx-translate/http-loader` 
* 4、在根模块中`app.module.ts`中引入上面安装的模块
    ```javascript
    import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
    import { TranslateHttpLoader } from '@ngx-translate/http-loader';
    
    ```
* 5、在`assets`文件夹中新建`i18n`文件夹新增两个json文件
    * zh-CN.json 
    * en.json
* 6、`zh-CN.json`文件表示中文内容
    ```json
    {
        "title": "我是需要翻译的",
        "hello": "你好",
        "get-lang": "获取语言类型",
        "content": "你好世界"
    }
    ```
* 7、`en.json`文件表示英文下内容
    ```json
    {
        "title": "title",
        "hello": "Hi",
        "get-lang": "getlang",
        "content": "hello word"
    }
    ```
* 8、继续在app.module.ts文件中添加内容
    ```javascript
    ....
    export function HttpLoaderFactory(http:Http){
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
    }
    ....
    @NgModule:({
        ...
        imports:[
            TranslateModule.forRoot({
                loader:{
                    provide:TranslateLoader,
                    useFactory:HttpLoaderFactory,
                    deps:[Http]
                }
            })
        ]
        ...
    })
    ```
* 9、在`Page3Component.ts`文件中添加引入
    ```javascript
    import { TranslateService } from '@ngx-translate/core'
    ```
* 10、在`Page3Component.ts`书写中英文切换
    ```javascript
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
    ```
* 11、在`Page3Component.html`书写页面
    ```html
    <div>
        <h2>{{ 'title' | translate }}</h2>
        <label>{{ 'hello' | translate }}
            <select #langSelect (change)="changeLang(langSelect.value)">
            <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
            </select>
        </label>
        <p>{{'content' | translate}}</p>
    </div>
    <button (click)="toggleLang()">{{'get-lang' | translate}}</button>
    ```