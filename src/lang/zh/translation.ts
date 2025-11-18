import common from './common'
import codelist from './total/codelist'
import document_template from './total/document_template'
import document_template_version from './total/document_template_version'
import form_template from './total/form_template'
import form_template_version from './total/form_template_version'
import form_section_template from './total/form_section_template'
import form_question_template from './total/form_question_template'
import document from './total/document'
import form from './total/form'
import form_section from './total/form_section'
import form_question from './total/form_question'
import user from './total/user'
import user_history from './total/user_history'
import receipt_org from './total/receipt_org'
import internal_org from './total/internal_org'
import notification_config from './total/notification_config'
import notification_history from './total/notification_history'
import table_column_config from './total/table_column_config'
import form_var_config from './total/form_var_config'
import send_config from './total/send_config'
import sub_question from './total/sub_question'
import send_history from './total/send_history'
import form_var_value from './total/form_var_value'
import document_template_rule from './total/document_template_rule'
import user_permission from './total/user_permission'
import turn_group_schedule from './total/turn_group_schedule'
import document_step from "@/lang/zh/total/document_step";
import monthly_security_check from "@/lang/zh/total/monthly_security_check";
import yuancang_operaton from "@/lang/zh/total/yuancang_operaton";
import security_declare from "@/lang/zh/total/security_declare";
import ship_operation_document from "@/lang/zh/total/ship_operation_document";

export default {
  ...common,
  ...codelist,
  ...ship_operation_document,
  ...monthly_security_check,
  ...security_declare,
  ...yuancang_operaton,
  ...document_template,
  ...document_template_version,
  ...form_template,
  ...form_template_version,
  ...form_section_template,
  ...form_question_template,
  ...document,
  ...form,
  ...form_section,
  ...form_question,
  ...user,
  ...user_history,
  ...receipt_org,
  ...internal_org,
  ...notification_config,
  ...notification_history,
  ...table_column_config,
  ...form_var_config,
  ...send_config,
  ...sub_question,
  ...send_history,
  ...form_var_value,
  ...document_template_rule,
  ...user_permission,
  ...turn_group_schedule,
  ...document_step
}
