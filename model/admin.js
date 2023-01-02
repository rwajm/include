import db from "../config/database";

const ADMIN = (admin) => {
    ADMIN.admin_id = admin.admin_id;
    ADMIN.password = admin.password;
    ADMIN.admin_name = admin.admin_name;
}

export default ADMIN;