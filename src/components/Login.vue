<template>
  <div class="LoginView">
      <t-dialog  width="500px" class="fixed" v-model:visible="stateStore.visible.loginByMobile" placement="center"
          destroyOnClose :footer="false">
        <template #header>
          <t-row class="login-header-main">
            <t-col class="login-header-bg">
              <t-image @click="headerImageClick2" :src="barcode" fit="fill"
                :style="{ width: '100px', height: '100px', borderTopLeftRadius: '30px' }"></t-image>
            </t-col>
            <!-- <t-col><t-image :src="imgurl" fit="fill" :style="{ width: '20px', height: '20px',borderRadius:'100%' }"></t-image></t-col> -->
            <t-col>
              <t-row>
                <t-col>

                </t-col>
                <t-col class="login-header-info">
                  <icon name="arrow-left" color="blue" size="17px" />
                  <span class="login-header-info-phone">手机扫码登录</span>
                </t-col>
              </t-row>
            </t-col>
          </t-row>
        </template>
        <template #body>
          <div class="login-zone">
            <!-- <t-space direction="vertical" style="width: 100%"> -->
            <div class="login-title">
              短信验证码登录
            </div>
            <div class="login-subtitle">
              未注册的微信号将自动注册账号
            </div>
            <form>
              <div class="login-barcode">
                <div class="login-barcode-input">
                  <t-space direction="vertical">
                    <t-row>

                      <t-input v-model="userLogin3Input.phone" placeholder="请输入手机号码(+86)" maxlength="11">
                        <template #suffixIcon>
                          <t-button class="t-input-button" :disable="userLogin3Input.stayTime != 0"
                            @click="getSmsCodeHandler">{{ userLogin3Input.stayTime != 0 ? `已发送(${userLogin3Input.stayTime}s)` : "获取验证码" }}</t-button>
                        </template>
                      </t-input>
                    </t-row>
                    <t-row>
                      <t-col class="flex flex-row">
                        <t-input class="flex-1" v-model="userLogin3Input.smsCode" placeholder="请输入收到的短信验证码"></t-input>
                        <t-input class="ml-[20px] w-[150px]" v-model="userLogin3Input.invitationCode" placeholder="请输入邀请码(可选)"></t-input>
                      </t-col>
                    </t-row>
                  </t-space>
                </div>
              </div>
              <div class="login-type">
                <!-- <div class="login-type-item"> 
                  <t-image :src="xl_icon" fit="fill" :style="{ width: '40px', height: '40px',borderRadius:'50%'}"></t-image>
                </div>
                <div class="login-type-item">
                  <t-image :src="qq_icon" fit="fill" :style="{ width: '40px', height: '40px',borderRadius:'50%'}"></t-image>
                </div> -->
                <t-button @click="login3Handler" type="button" size="large" style="border-radius:12px;">登录</t-button>
              </div>
            </form>

            <div class="login-info">
              <p>登录即代表同意用户服务协议</p>
            </div>
            <!-- <t-pagination v-model="current" v-model:pageSize="pageSize" :total="30" /> -->
            <!-- </t-space> -->
          </div>
        </template>

      </t-dialog>
      <t-dialog class="select-none" width="560px" v-model:visible="stateStore.visible.editProfile" header=" " showOverlay placement="center" :footer="false" :confirm-on-enter="true">
        
        <template #body>
          <t-row justify="center">
            <div class="title-text">
              完善您的个人信息
            </div>
          </t-row>
          <div class="gender-selection">
            <label class="gender-option" for="male">
              <input type="radio" id="male" value="0" v-model="userProfileInput.gender" name="gender">
              <t-image
                :src="iconUrl.male"
                :style="{ width: '100px', height: '100px' }"
                shape="circle"
                fit="cover"
              />
              <span :class="{ 'selected': userProfileInput.gender == 0 }">男</span>
            </label>
            <label class="gender-option" for="female">
              <input type="radio" id="female" value="1" v-model="userProfileInput.gender" name="gender">
              <t-image
                :src="iconUrl.female"
                :style="{ width: '100px', height: '100px'}"
                shape="circle"
                fit="cover"
              />
              <span :class="{ 'selected': userProfileInput.gender == 1 }">女</span>
            </label>
          </div>
          <t-row justify="center">
            <div class="nickname-input">
              <span>创建昵称:</span>
              <t-input
              placeholder="支持英文字母、汉字、数字，长度不超过8个字符" 
              clearable 
              v-model="userProfileInput.nickname"
              :style="{ width: '320px', borderRadius: '10px'}"
              ></t-input>
              <t-image
                :src="iconUrl.availableIcon"
                shape="circle"
                fit="cover"
                :style="{ marginLeft: '10px', marginRight: '5px'}"
              />
              <span :style="{ color: isAvailable ? 'green' : 'red' }">
                {{ isAvailable ? '该昵称可用' : '该昵称不可用' }}
              </span>
            </div>
          </t-row>
          <t-row justify="center">
            <t-button 
            @click="handleSetProfile"
            :style="{ width: '389px', borderRadius: '15px', height: '37px'}">
              下一步
            </t-button>
          </t-row>
          
          
        </template>
      </t-dialog>
      <t-dialog class="select-none" width="560px" v-model:visible="stateStore.visible.firstLoginDaily" header=" " showOverlay placement="center" :footer="false" :confirm-on-enter="true">
        <template #body>
              每日首次登录奖励
        </template>
      </t-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps ,watch,onMounted } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
import { useUserStore } from '@/store/user';
import { useStateStore } from '@/store/state';
import { login, getSmsCode,setUserProfile } from '@/api/user';
import { Avatar } from 'tdesign-vue-next';
import { useRoute,useRouter  } from 'vue-router';  
import { MessagePlugin } from 'tdesign-vue-next'; 
const route = useRoute()
const router = useRouter()
const userStore = useUserStore();
const stateStore = useStateStore();
const iconUrl = ref({
  male: require('@/assets/images/male.png'),
  female: require('@/assets/images/female.png'),
  availableIcon: require('@/assets/images/right.png'),
});
const isAvailable = ref(true)
const userProfileInput = ref({
  nickname:userStore.user.nickname,
  gender:userStore.user.sex,
})
const handleSetProfile = () => {
  const userObject = {
    "nickname": userProfileInput.value.nickname,
    "sex": userProfileInput.value.gender
  }
  setUserProfile({
    "nickname": userProfileInput.value.nickname,
    "sex": userProfileInput.value.gender,
    "avatar": userProfileInput.value.gender==0?iconUrl.male : iconUrl.female
  }).then(res => {
    const { data } = res;
    if (data.code == 200) {
      stateStore.setVisible("editProfile",false);
      userStore.setUser(userObject);
      userStore.init();
    }
  })
}
const userLogin3Input = ref({
  stayTime: 0,
  phone: "",
  smsCode: "",
  invitationCode:0
});
// 短信验证码登录

//获取验证码
const getSmsCodeHandler = () => {
  const phoneNumberRegex = /^1[3-9]\d{9}$/;
  if (phoneNumberRegex.test(userLogin3Input.value.phone)) {
    getSmsCode(userLogin3Input.value.phone).then(res => {
      const { data } = res;
      if (data.code == 200) {
        userLogin3Input.value.stayTime = 60;
        const interval = setInterval(() => {
          userLogin3Input.value.stayTime--;
          if (userLogin3Input.value.stayTime <= 0) {
            userLogin3Input.value.stayTime = 0
            clearInterval(interval);
          }
        }, 1000)
      }
    })
  }
}

//登录控制
const login3Handler = () => {
  const { phone, smsCode, invitationCode } = userLogin3Input.value;
  if (phone && smsCode) {
    login({ mobile: phone, smsCode, invitationCode }).then(res => {
      const { data } = res;
      if (data.code === 200) {
        stateStore.toggleVisible("loginByMobile");
        localStorage.setItem("token", data.data.token);
        userStore.setUser(data.data.ssoUserVo);
        if (!userStore.user.nickname) {
          userStore.setUser({
            mobile: phone,
            nickname: phone,
            sex: 0,
          });
          stateStore.setVisible("editProfile", true);
        }
        if (data.data.point) {
          stateStore.setVisible("firstLoginDaily", true);
        }
      } else {
        showErrorMsg("验证码错误");
      }
    });
  } else {
    showErrorMsg("请输入手机号和验证码");
  }
};

const showErrorMsg = (content) => {
  MessagePlugin.error({
    content,
    placement: "bottom",
    duration: 3000,
  });
};

onMounted(async () => {
  localStorage.getItem("token") ? stateStore.setVisible("loginByMobile",false)  : stateStore.setVisible("loginByMobile", true);
  userStore.user.nickname =="" ? stateStore.setVisible("editProfile",true)  : stateStore.setVisible("editProfile", false);
  await router.isReady();
  const { query } = route;
  userLogin3Input.value.invitationCode = query.invitationCode || "";
})

</script>

<style scoped>
.title-text {
  @apply text-2xl font-black tracking-[1px] mb-5;
  font-family: Arial, Helvetica, sans-serif;
}
.gender-selection {
  @apply inline-flex justify-center items-center mb-[15px];
}
.gender-option {
  @apply flex flex-col items-center cursor-pointer mx-5 my-0;
}
.gender-selection input[type="radio"] {
  @apply hidden;
}
.gender-selection label {
  @apply cursor-pointer mr-2.5;
}
.selected {
  @apply text-[#3B59C3] font-semibold;
}
.nickname-input {
  @apply flex items-center mt-2.5 mb-5;
}
.nickname-input span {
  @apply whitespace-nowrap mr-2.5;
}
</style>