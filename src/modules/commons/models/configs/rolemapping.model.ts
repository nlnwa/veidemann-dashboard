import {ConfigObject} from '../configobject.model';
import {RoleMappingProto} from '../../../../api';

export enum Role {
  ANY_USER,
  ANY,
  ADMIN,
  CURATOR,
  READONLY,
  OPERATOR,
  SYSTEM,
}

export class RoleMapping {
  email?: string;
  group?: string;
  roleList: Role[];

  constructor({
                email = '',
                group = '',
                roleList = []
              }: Partial<RoleMapping> = {}) {
    this.email = email;
    this.group = group;
    this.roleList = roleList ? [...roleList] : [];
  }

  static fromProto(proto: RoleMappingProto): RoleMapping {
    return new RoleMapping({
      email: proto.getEmail(),
      group: proto.getGroup(),
      roleList: proto.getRoleList()
    });
  }

  static toProto(roleMapping: RoleMapping): RoleMappingProto {
    const proto = new RoleMappingProto();
    if (roleMapping.email !== null) {
      proto.setEmail(roleMapping.email);
    }
    if (roleMapping.group !== null) {
      proto.setGroup(roleMapping.group);
    }
    proto.setRoleList(roleMapping.roleList);

    return proto;
  }

  static mergeConfigs(configObjects: ConfigObject[]): RoleMapping {
    const roleMapping = new RoleMapping();

    const commonRoles = getCommonRoles(configObjects);


    for (const role of commonRoles) {
      const gotRole = configObjects.every((cfg) => cfg.roleMapping.roleList.indexOf(role) !== -1);
      if (gotRole) {
        roleMapping.roleList.push(role);
      }
    }
    return roleMapping;
  }
}

function getCommonRoles(configObjects: ConfigObject[]): Role[] {
  return Array.from(new Set(
    configObjects
      .map(configObject => configObject.roleMapping.roleList)
      .reduce((acc, curr) => acc.concat(curr), [])
  ));
}

export class RoleList {
  role: string[];
}
