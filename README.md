## ������Ŀ��ʹ�÷�ʽ
* npm install
* npm run start

----
### angular2�п������ʻ�(һ��ҳ���������л���������)
#### ʵ�ֹ��ʻ���������
* 1��ʹ��`angular-cli`����һ����Ŀ����
* 2������һ�����`page3`��`demo`��չ�ֹ��ʻ�����
* 3��ʹ��`npm`��װ`ngx-translate`ģ��
    * `npm install --save @ngx-translate/core`
    * `npm install --save @ngx-translate/http-loader` 
* 4���ڸ�ģ����`app.module.ts`���������氲װ��ģ��
    ```javascript
    import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
    import { TranslateHttpLoader } from '@ngx-translate/http-loader';
    
    ```
* 5����`assets`�ļ������½�`i18n`�ļ�����������json�ļ�
    * zh-CN.json 
    * en.json
* 6��`zh-CN.json`�ļ���ʾ��������
    ```json
    {
        "title": "������Ҫ�����",
        "hello": "���",
        "get-lang": "��ȡ��������",
        "content": "�������"
    }
    ```
* 7��`en.json`�ļ���ʾӢ��������
    ```json
    {
        "title": "title",
        "hello": "Hi",
        "get-lang": "getlang",
        "content": "hello word"
    }
    ```
* 8��������app.module.ts�ļ����������
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
* 9����`Page3Component.ts`�ļ����������
    ```javascript
    import { TranslateService } from '@ngx-translate/core'
    ```
* 10����`Page3Component.ts`��д��Ӣ���л�
    ```javascript
    export class Page3Component implements OnInit {   
        constructor(private translate: TranslateService) {
            //�������֧��
            translate.addLangs(['zh-CN', 'en']);
            //����Ĭ�����ԣ�һ�����޷�ƥ���ʱ��ʹ��
            translate.setDefaultLang('zh-CN');
                        
            //��ȡ��ǰ��������������Ա���en�� zh
            let broswerLang = translate.getBrowserLang();
            translate.use(broswerLang.match(/en|zh-CN/) ? broswerLang : 'zh-CN');
        }
        //������select��������ȡֵ�ķ���
        changeLang(lang) {
            console.log(`�����������ȡ��ֵ:${lang}`);
            //���õ�ǰʹ��ʲô����
            this.translate.use(lang);
        }
        //�����ť��ȡ��ǰ��ʲô����
        toggleLang() {
            console.log("���ǵ����ť��:",this.translate.getBrowserLang());
            //��ȡ���Է���൱�ڸ���ϸ���������ͣ�����zh-CN��zh-TW��en-US
            console.log("���ǵ����ť��:",this.translate.getBrowserCultureLang());
        }
        ngOnInit() {
        
        }
            
    }
    ```
* 11����`Page3Component.html`��дҳ��
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