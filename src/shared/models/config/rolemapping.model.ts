import {ConfigObject} from './configobject.model';
import {ApiKeyProto, RoleMappingProto} from '../../../api';
import {Role} from './role.model';
import {fromTimestampProto, toTimestampProto} from '../../func';

export class RoleMapping {
  apiKey?: ApiKey;
  email?: string;
  group?: string;
  roleList: Role[];

  constructor({
                apiKey = new ApiKey(),
                email = '',
                group = '',
                roleList = []
              }: Partial<RoleMapping> = {}) {
    this.apiKey = apiKey;
    this.email = email;
    this.group = group;
    this.roleList = roleList ? [...roleList] : [];
  }

  static fromProto(proto: RoleMappingProto): RoleMapping {
    return new RoleMapping({
      apiKey: proto.getApiKey() ? ApiKey.fromProto(proto.getApiKey()) : undefined,
      email: proto.getEmail(),
      group: proto.getGroup(),
      roleList: proto.getRoleList()
    });
  }

  static toProto(roleMapping: RoleMapping): RoleMappingProto {
    const proto = new RoleMappingProto();

    proto.setApiKey(ApiKey.toProto(roleMapping.apiKey));
    proto.setRoleList(roleMapping.roleList);
    proto.setEmail(roleMapping.email);
    if (roleMapping.group) {
      proto.setGroup(roleMapping.group);
    }

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

export class ApiKey {
  token: string;
  validUntil?: string;

  constructor({
                token = '',
                validUntil = '',
              }: Partial<ApiKey> = {}) {
    this.token = token;
    this.validUntil = validUntil;
  }

  static fromProto(proto: ApiKeyProto): ApiKey {
    return new ApiKey({
      token: proto.getToken(),
      validUntil: fromTimestampProto(proto.getValiduntil()),
    });
  }

  static toProto(apiKey: ApiKey): ApiKeyProto {
    const proto = new ApiKeyProto();
    proto.setToken(apiKey.token);
    proto.setValiduntil(toTimestampProto(apiKey.validUntil));
    return proto;
  }
}
