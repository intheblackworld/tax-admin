import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { VForm } from '@/type'

const UsersModule = namespace('users')

@Component
export default class CreateMixin extends Vue {
  @UsersModule.State('step') public step!: number
  @UsersModule.Mutation('handleStep') public handleStep: any

  @Prop({ default: true }) public isShowSteps!: boolean
  @Prop({ default: true }) public isForCreate!: boolean

  get personId() {
    return this.$route.params.personId
  }

  public rules = {
    required: (value: string) => !!value || '此欄位必填',
  }

  public validateAndNext(step: number, form: VForm | VForm[]) {
    let isMultiFormValidate = true
    if (form instanceof Array) {
      form.forEach((item) => {
        item.validate()
        if (!item.validate()) {
          isMultiFormValidate = false
        }
      })
      if (isMultiFormValidate) {
        this.handleStep(step)
      }
    } else {
      form.validate()
      if (form.validate()) {
        this.handleStep(step)
      }
    }
  }

  public resetCurrentForm(forms: VForm | VForm[]) {
    if (forms instanceof Array) {
      forms.forEach((form) => form.reset())
    } else {
      forms.reset()
    }
  }

  public pickFile(ref: HTMLElement) {
    ref.click()
  }

  public onFilePicked(
    e: any,
    stepName: string,
    name: string,
    model: string,
    hasMultiData: boolean,
    index: number,
  ) {
    const files = e.target.files
    interface IParams {
      [key: string]: any
    }
    if (files[0] !== undefined) {
      const filesName = Array.from(files as FileList)
        .map((file: { name: string }) => file.name)
        .join(',')

      // 如果為多筆資料，要判斷上傳的檔案位於哪一筆資料
      if (hasMultiData) {
        ; (this as IParams)[stepName][index][name] = filesName
      } else {
        ; (this as IParams)[name] = filesName
      }
      Array.from(files as FileList).forEach((file: any) => {
        const fr = new FileReader()
        const getResult = new Promise((resolve) => {
          fr.onload = (event: any) => {
            if (hasMultiData) {
              ; (this as IParams)[stepName][index][model].push({
                name: file.name,
                url: event.target.result,
              })
            } else {
              ; (this as IParams)[stepName][model].push({
                name: file.name,
                url: event.target.result,
              })
            }
          }
        })
        fr.readAsDataURL(file)
      })
    } else {
      ; (this as IParams)[name] = ''
    }
  }
}
