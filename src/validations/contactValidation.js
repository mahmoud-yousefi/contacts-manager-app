import * as YUP from 'yup';
// import {string, number} from "yup";

export const contactSchema = YUP.object().shape({
    fullname: YUP.string().required("نام و نام خانوادگی الزامی می باشد"),
    photo: YUP.string().url("آدرس معتبر نیست").required("تصویر مخاطب الزامی می باشد"),
    mobile: YUP.number().required("شماره موبایل الزامی می باشد"),
    email: YUP.string().email("آدرس ایمیل معتبر نیست").required("آدرس ایمیل الزامی می باشد"),
    job: YUP.string().nullable(),
    group: YUP.string().required("انتخاب گروه الزامی می باشد")
});