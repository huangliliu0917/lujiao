<template lang="pug">
 el-dialog(title='配置', :visible.sync='visible',  width='40%' :close-on-click-modal="false" :before-close="cancel")
    el-form(:model='form', ref='form', label-width='120px')
      el-form-item(label='收款二维码')
        el-upload.upload-demo(action="" :http-request="uploadUrl" :show-file-list="false")
          el-button(size='small', type='primary') 点击上传
      el-form-item(v-if="!isEmpty(form.contentObj)")
        .layout-row__between.align-center
          .layout-row.align-center
            img.img(:src="form.contentObj.url")
      el-form-item(label='单笔限额', prop='ceiling')
        el-input(v-model='form.singleCeilingMin' placeholder="设置单次最小金额(以防风控)" style="width:45%")
        |-
        el-input(v-model='form.singleCeilingMax' placeholder="设置单次最大金额(以防风控)" style="width:45%")
      el-form-item(label='备注1', prop='remark')
        el-input(v-model='form.remark' placeholder="备注(主要用于备注二维码用途)")
    span.dialog-footer(slot='footer')
      el-button(@click='cancel') 取 消
      el-button(type='primary',v-loading="loading" @click='submitForm') 确 定
</template>

<script>
import { updateConfigPay } from "@/api/pay";
import { isEmpty } from "lodash";
import { mapState } from "vuex";
export default {
  props: ["visible", "data", "isAdd", "payWay", "account"],
  components: {},
  computed: {
    ...mapState(["settings"])
  },
  watch: {
    data: {
      handler(val) {
        this.form = val;
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      form: {
        contentObj: {}
      },
      trules: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      if (isEmpty(this.form.contentObj)) {
        this.$message.error("请填写支付配置内容！");
        return;
      }
      this.loading = true;
      updateConfigPay({
        ...this.form,
        payWayDictId: 6,
        payConfigAccountId: this.account.id
      })
        .then(res => {
          this.$message.success(`${this.isAdd ? "添加" : "修改"}成功！`);
          this.cancel();
          this.$emit("finish");
        })
        .catch(err => {
          this.$message.error("修改失败！");
        })
        .finally(_ => {
          this.loading = false;
        });
    },
    isEmpty(data) {
      return isEmpty(data);
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //图片上传
    uploadUrl(raw) {
      let _self = this;
      let reader = new FileReader();
      reader.readAsDataURL(raw.file);
      reader.onload = function() {
        qrcode.decode(_self.getObjectURL(raw.file));
        qrcode.callback = function(qrUrl) {
          if (qrUrl === "error decoding QR Code") {
            _self.$message.error("未能识别支付二维码！");
          } else {
            let data = {
              //   money: 0,
              url: reader.result,
              qrUrl
            };
            _self.$set(_self.form, "contentObj", data);
          }
        };
      };
    },
    cancel() {
      this.$emit("update:visible", false);
    },
    sizeChange(num) {
      this.pageSize = num;
      this.getPays();
    }
  }
};
</script>

<style lang="scss" scoped>
.img {
  width: 100px;
  & + div {
    margin-left: 10px;
  }
}
</style>
