import {Role as RoleProto, RoleMapping as RoleMappingProto} from '../../../../api/config/v1/config_pb';
import {ConfigObject} from '../configobject.model';

export enum Role {
  ANY_USER,
  ANY,
  ADMIN,
  CURATOR,
  READONLY,
}

export class RoleMapping {
  email?: string;
  group?: string;
  roleList: Role[];

  constructor({
                email = '',
                group = '',
                roleList = []
              } = {}) {
    this.email = email;
    this.group = group;
    this.roleList = roleList;
  }

  static fromProto(proto: RoleMappingProto): RoleMapping {
    return new RoleMapping({
      email: proto.getEmail(),
      group: proto.getGroup(),
      roleList: proto.getRoleList().map(role => Role[role])
    });
  }

  static mergeConfigs(configObjects: ConfigObject[]): RoleMapping {
    const roleMapping = new RoleMapping();
    const compareObj: RoleMapping = configObjects[0].roleMapping;

    const commonRoles = commonRole(configObjects);
    const equalTypes = equalType(configObjects);

    const equalEmail = configObjects.every(function (cfg) {
      return cfg.roleMapping.email === compareObj.email;
    });

    const equalGroup = configObjects.every(function (cfg) {
      return cfg.roleMapping.group === compareObj.group;
    });

    const rolesToRemove = [];
    for (const commonrole of commonRoles) {
      for (const configObject of configObjects) {
        if (!configObject.roleMapping.roleList.includes(commonrole)) {
          rolesToRemove.push(commonrole);
        }
      }
    }
    for (const remove of rolesToRemove) {
      commonRoles.splice(commonRoles.indexOf(remove), 1);
    }
    roleMapping.roleList = commonRoles;

    if (equalTypes.eqType) {
      if (equalTypes.type === 1) { // All selected users is of type 'email'
        roleMapping.group = undefined;
        if (equalEmail) {
          roleMapping.email = compareObj.email;
        } else {
          roleMapping.email = '';
        }
      }

      if (equalTypes.type === 2) { // All selected users is of type 'group'
        roleMapping.email = undefined;
        if (equalGroup) {
          roleMapping.group = compareObj.group;
        } else {
          roleMapping.group = '';
        }
      }
    } else { // Selected users is not of the same type
      roleMapping.email = undefined;
      roleMapping.group = undefined;
    }

    return roleMapping;
  }

  toProto(): RoleMappingProto {
    const proto = new RoleMappingProto() as any as RoleMappingProto.AsObject;
    if (this.email !== null) {
      proto.email = this.email;
    }
    if (this.group !== null) {
      proto.group = this.group;
    }

    proto.roleList = this.roleList.map(role => RoleProto[role.toString()]);


    return proto as any as RoleMappingProto;
  }

  createUpdateRequest(configUpdate: ConfigObject, formControl: any, addRoles: boolean, mergedConfig?: ConfigObject) {
    const roleMapping = new RoleMapping();
    const pathList = [];

    if (mergedConfig) {
      if (formControl.email.dirty) {
        if (configUpdate.roleMapping.email !== mergedConfig.roleMapping.email) {
          roleMapping.email = configUpdate.roleMapping.email;
          pathList.push('roleMapping.email');
        }
      }

      if (formControl.group.dirty) {
        if (configUpdate.roleMapping.group !== mergedConfig.roleMapping.group) {
          roleMapping.group = configUpdate.roleMapping.group;
          pathList.push('roleMapping.group');
        }
      }
      if (addRoles !== undefined) {
      if (formControl.roleList.dirty) {
          if (addRoles) {
            roleMapping.roleList = configUpdate.roleMapping.roleList;
            pathList.push('roleMapping.role+');
          }
          if (!addRoles) {
            roleMapping.roleList = configUpdate.roleMapping.roleList;
            pathList.push('roleMapping.role-');
          }
        }
      }
    } else {
      if (formControl.email.dirty) {
        roleMapping.email = configUpdate.roleMapping.email;
        pathList.push('roleMapping.email');
      }

      if (formControl.group.dirty) {
        roleMapping.group = configUpdate.roleMapping.group;
        pathList.push('roleMapping.group');
      }

      if (formControl.roleList.dirty) {
        if (addRoles !== undefined) {
          if (addRoles) {
            roleMapping.roleList = configUpdate.roleMapping.roleList;
            pathList.push('roleMapping.role+');
          }
          if (!addRoles) {
            roleMapping.roleList = configUpdate.roleMapping.roleList;
            pathList.push('roleMapping.role-');
          }
        }
      }
    }
    return {updateTemplate: roleMapping, pathList: pathList};
  }
}

function commonRole(configObjects: ConfigObject[]) {
  const allRoles = [];
  for (const config of configObjects) {
    if (config.roleMapping.roleList !== undefined) {
      for (const role of config.roleMapping.roleList) {
        allRoles.push(role);
      }
    }
    const unique = (roles) => roles.filter((v, i) => allRoles.indexOf(v) === i);
    return unique(allRoles);
  }
}

function equalType(configObjects: ConfigObject[]) {
  const compareObj = configObjects[0].roleMapping;

  console.log('compare: ', compareObj);

  if (compareObj.email !== '') {

    const allTypeEmail = configObjects.every(function (cfg) {
      return cfg.roleMapping.email === compareObj.email;
    });
    console.log('returning type 1 eq email', allTypeEmail);
    return {eqType: allTypeEmail, type: 1};
  }

  if (compareObj.group !== '') {
    const allTypeGroup = configObjects.every(function (cfg) {
      return cfg.roleMapping.group === compareObj.group;
    });
    console.log('returning type 2 eq group', allTypeGroup);
    return {eqType: allTypeGroup, type: 2};
  }
}

export class RoleList {
  role: string[];
}
