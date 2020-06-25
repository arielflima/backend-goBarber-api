import IParseMaillTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMaillTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
